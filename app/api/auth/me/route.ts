import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getSession();

        if (!session || !session.userId) {
            return NextResponse.json({ user: null });
        }

        const user = db.select({
            id: users.id,
            name: users.name,
            email: users.email
        }).from(users).where(eq(users.id, Number(session.userId))).get();

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ user: null });
    }
}
