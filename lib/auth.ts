import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-this-in-production';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedSecret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');

  if (!token) return null;

  return await verifyToken(token.value);
}

export async function createSession(userId: number, email: string) {
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  const expires = new Date(Date.now() + maxAge * 1000);

  const token = await signToken({ userId, email });

  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) return NextResponse.next();

  const session = await verifyToken(token);
  if (!session) return NextResponse.next();

  // Optionally extend session expiration here
  // const res = NextResponse.next();
  // res.cookies.set({...})
  // return res;

  return NextResponse.next();
}
