import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const res = NextResponse.redirect(new URL("/", req.url));
        res.cookies.delete("auth_token");
        return res;
    } catch (error) {
        // Even if something unexpected happens, don't strand the user on the API route.
        const res = NextResponse.redirect(new URL("/", req.url));
        res.cookies.delete("auth_token");
        return res;
    }
}

export async function GET(req: Request) {
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.delete("auth_token");
    return res;
}
