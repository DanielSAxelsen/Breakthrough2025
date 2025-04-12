// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { z } from "zod";
import { locales } from "@/i18n/routing";
import { createEvent, EventAttributes } from 'ics';

const prisma = new PrismaClient();

const rsvpSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email().min(1, "Email is required"),
    bonusQuestion: z.string().optional(),
    foodRestrictions: z.string().optional(),
});

export async function POST(req: Request) {
    const body = await req.json();

    // Validate the request body
    const validation = rsvpSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
    }

    const { firstName, lastName, email, foodRestrictions, bonusQuestion } = validation.data;

    try {
        // Send confirmation email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail", // Or use a different service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Multilingual messages
        const messages = {
            en: {
                subject: "Sign Up Confirmation - Breakthruogh 2025",
                greeting: `Dear ${firstName}, \n`,
                attending: "We have received your signup and look forward to seeing you at Mantzius, Birkerød on May 25, 2025! On our website, you can see other practical information.",
                signature: "Best, \nDaniel Axelsen"
            },
        };

        const locale = "en";
        // Only create calendar event if attending
        let calendarAttachment;
        const event = {
            start: [2025, 5, 25, 9, 30], // May 25, 2025, 9:30
            duration: { hours: 6, minutes: 0 },
            title: 'Breakthrough 2025',
            description: 'Building Lego, Improving Teamwork',
            location: 'Johan Mantzius Vej 7a, 3460 Birkerød, Danmark',
            url: 'https://breakthrough2025.vercel.app/',
            status: 'CONFIRMED',
        } as EventAttributes;

        const { error, value } = createEvent(event);
        if (error) {
            console.error('Error creating calendar event:', error);
        } else {
            calendarAttachment = [{
                filename: 'breakthrough2025.ics',
                content: value,
                contentType: 'text/calendar'
            }];
        }

        // HTML email template
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <h1 style="color: #4a5568; text-align: center; margin-bottom: 30px;">
                    ${messages[locale as keyof typeof messages].subject}
                </h1>
                
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                    ${messages[locale as keyof typeof messages].greeting}
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                    ${messages[locale as keyof typeof messages].attending}
                </p>

                <div style="background-color: #f7fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h2 style="color: #4a5568; margin-bottom: 15px;">Event Details</h2>
                    <p style="margin: 5px 0;">📅 Date: May 25, 2025</p>
                    <p style="margin: 5px 0;">🕔 Time: 10:00</p>
                    <p style="margin: 5px 0;">📍 Location: Johan Mantzius Vej 7a, 3460 Birkerød, Danmark</p>
                </div>
                
                <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;" >
                    ${messages[locale as keyof typeof messages].signature}
                </p>
            </div>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: messages[locale as keyof typeof messages].subject,
            text: `${messages[locale as keyof typeof messages].greeting}\n\n${messages[locale as keyof typeof messages].attending}\n\n${messages[locale as keyof typeof messages].signature}`,
            html: htmlContent,
            attachments: calendarAttachment
        };

        await transporter.sendMail(mailOptions);

        // Save RSVP to the database using Prisma
        const newRSVP = await prisma.rSVP.create({
            data: {
                firstName,
                lastName,
                email,
                foodRestrictions,
                bonusQuestion
            },
        });

        return NextResponse.json({ message: "Signup received!", rsvp: newRSVP }, { status: 200 });
    } catch (error) {
        console.log("================================================================")
        console.error("Error:", error);
        console.log("================================================================")
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
