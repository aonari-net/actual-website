import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = db.select().from(users).where(eq(users.email, email)).get();

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const newUser = db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        }).returning().get();

        // Give a default free subscription row just for the dashboard mock
        if (newUser) {
            db.insert(subscriptions).values({
                userId: newUser.id,
                plan: "free",
                price: "0",
                status: "active",
                startDate: new Date(),
            }).run();

            // Create session via Jose
            await createSession(newUser.id, newUser.email);
        }

        return NextResponse.json({
            success: true,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
