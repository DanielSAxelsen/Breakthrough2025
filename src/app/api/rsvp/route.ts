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
    guests: z.array(z.string()),
    attendingCeremony: z.boolean(),
    attendingReception: z.boolean(),
    foodRestrictions: z.string().optional(),
    needsRide: z.string().optional(),
    interestedInStaying: z.string().optional(),
    locale: z.enum(locales).optional(),
});

export async function POST(req: Request) {
    const body = await req.json();

    // Validate the request body
    const validation = rsvpSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
    }


    const { firstName, lastName, email, guests, attendingCeremony, attendingReception, foodRestrictions, needsRide, interestedInStaying, locale } = validation.data;
    const attending = attendingCeremony || attendingReception;
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
                greeting: `Dear ${firstName}, ${guests.length > 0 ? `and ${guests.join(', ')}` : ''}`,
                attending: "We have received your signup and look forward to seeing you at Mantzius, Birkerød on May 25, 2025! On our website, you can see other practical information.",
                notAttending: "We have received your response to the RSVP form. While we're sad you can't make it to the wedding day, we completely understand and look forward to seeing you another time. If anything changes and you are able to join, feel free to reach us at jonas.melike.2025@gmail.com. You are more than welcome to check back on our website after the wedding to see pictures of the day.",
                signature: "Best,Daniel Axelsen"
            },

            tr: {
                subject: "RSVP onayı - Melike & Jonas",
                greeting: `Sevgili ${firstName}, ${guests.length > 0 ? `ve ${guests.join(', ')}` : ''}`,
                attending: "RSVP formuna verdiğiniz yanıtı aldık ve 3 Mayıs 2025'te Hundested'de görüşmeyi dört gözle bekliyoruz! Web sitemizde konaklama ve diğer pratik bilgileri bulabilirsiniz. Başka sorularınız varsa veya yanıtınızı düzenlemek isterseniz bize buradan ulaşabilirsiniz: jonas.melike.2025@gmail.com.",
                notAttending: "RSVP formuna verdiğiniz yanıtı aldık. Düğün günümüze katılamayacağınız için üzgünüz ama anlayışla karşılıyoruz ve sizi başka bir zaman görmeyi umuyoruz. Eğer planlarınız değişir ve katılabilirseniz, bize jonas.melike.2025@gmail.com adresinden ulaşabilirsiniz. Düğünden sonra web sitemizi ziyaret ederek günün fotoğraflarını görebilirsiniz.",
                signature: "Sevgiler,\nMelike & Jonas"
            }
        };


        // Only create calendar event if attending
        let calendarAttachment;
        if (attending) {
            const event = {
                start: [2025, 5, 3, 15, 0], // May 3, 2025, 15:00
                duration: { hours: 7, minutes: 0 },
                title: 'Breakthrough 2025',
                description: 'Building Lego, Improving Teamwork',
                location: 'Johan Mantzius Vej 7a, 3460 Birkerød, Danmark',
                url: '(UPDATE THIS)',
                status: 'CONFIRMED',
            } as EventAttributes;

            const { error, value } = createEvent(event);
            if (error) {
                console.error('Error creating calendar event:', error);
            } else {
                calendarAttachment = [{
                    filename: 'wedding.ics',
                    content: value,
                    contentType: 'text/calendar'
                }];
            }
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
                    ${attending ? messages[locale as keyof typeof messages].attending : messages[locale as keyof typeof messages].notAttending}
                </p>

                ${attending ? `
                <div style="background-color: #f7fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h2 style="color: #4a5568; margin-bottom: 15px;">Event Details</h2>
                    <p style="margin: 5px 0;">📅 Date: May 25, 2025</p>
                    <p style="margin: 5px 0;">🕔 Time: 10:00</p>
                    <p style="margin: 5px 0;">📍 Location: Johan Mantzius Vej 7a, 3460 Birkerød, Danmark</p>
                </div>
                ` : ''}
                
                <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
                    ${messages[locale as keyof typeof messages].signature}
                </p>
            </div>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: messages[locale as keyof typeof messages].subject,
            text: `${messages[locale as keyof typeof messages].greeting}\n\n${attending ? messages[locale as keyof typeof messages].attending : messages[locale as keyof typeof messages].notAttending}\n\n${messages[locale as keyof typeof messages].signature}`,
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
                guests,
                attendingCeremony,
                attendingReception,
                foodRestrictions,
                needsRide,
                interestedInStaying,
            },
        });

        return NextResponse.json({ message: "Signup received!", rsvp: newRSVP }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
