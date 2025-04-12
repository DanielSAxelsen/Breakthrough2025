'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function getRSVPS() {
    const rsvps = await prisma.rSVP.findMany();
    return rsvps;
}