import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const extraInformationSchema = z.object({
    extraInformation: z.string().optional(),
    email: z.string().email().min(1, "Email is required"),
});

const prisma = new PrismaClient();


export async function PUT(req: Request) {

    const body = await req.json();
    console.log(body)

    // Validate the request body
    const validation = extraInformationSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
    }

    const { extraInformation, email } = validation.data;

    console.log(validation.data);
    try {

        const newRSVP = await prisma.rSVP.update({
            where: { email },
            data: {
                extraInformation
            },
        });

        return NextResponse.json({ message: "RSVP updated!", rsvp: newRSVP }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
