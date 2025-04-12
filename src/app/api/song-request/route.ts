import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const songRequestSchema = z.object({
    songRequest: z.string().optional(),
    message: z.string().optional(),
    email: z.string().email().min(1, "Email is required"),
});

const prisma = new PrismaClient();


export async function PUT(req: Request) {

    const body = await req.json();

    // Validate the request body
    const validation = songRequestSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
    }

    const { songRequest, email, message } = validation.data;

    console.log(validation.data);
    try {

        const newRSVP = await prisma.rSVP.update({
            where: { email },
            data: {
                songRequest,
                message
            },
        });

        return NextResponse.json({ message: "RSVP updated!", rsvp: newRSVP }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
