import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS – CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// GET – Get all users or one by ID (?id=uuid)
export async function GET(request: NextRequest) {
  return Sentry.startSpan({ name: 'users.GET', attributes: { path: '/api/users' } }, async () => {
    try {
      const id = request.nextUrl.searchParams.get('id');
      Sentry.setTag('users.has_id', String(Boolean(id)));

      if (id) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          return new NextResponse('User not found', { status: 404, headers: corsHeaders });
        }
        return NextResponse.json(user, { headers: corsHeaders });
      }

      const users = await prisma.user.findMany();
      return NextResponse.json(users, { headers: corsHeaders });
    } catch (error) {
      Sentry.captureException(error, { tags: { route: '/api/users', method: 'GET' } });
      return new NextResponse('Server error', { status: 500, headers: corsHeaders });
    }
  });
}

// POST – Create new user
export async function POST(request: NextRequest) {
  return Sentry.startSpan({ name: 'users.POST', attributes: { path: '/api/users' } }, async () => {
    try {
      const { name, email } = await request.json();
      if (!name || !email) {
        return new NextResponse('Missing name or email', { status: 400, headers: corsHeaders });
      }

      Sentry.addBreadcrumb({ category: 'users', message: 'Creating user', level: 'info' });

      const newUser = await prisma.user.create({ data: { name, email } });
      return NextResponse.json(newUser, { status: 201, headers: corsHeaders });
    } catch (error) {
      Sentry.captureException(error, { tags: { route: '/api/users', method: 'POST' } });
      return new NextResponse('Invalid request body', { status: 400, headers: corsHeaders });
    }
  });
}

// PATCH – Update user by ID (?id=uuid)
export async function PATCH(request: NextRequest) {
  return Sentry.startSpan({ name: 'users.PATCH', attributes: { path: '/api/users' } }, async () => {
    try {
      const id = request.nextUrl.searchParams.get('id');
      if (!id) {
        return new NextResponse('Missing id', { status: 400, headers: corsHeaders });
      }

      const { name, email } = await request.json();
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(email !== undefined && { email }),
        },
      });

      return NextResponse.json(updatedUser, { headers: corsHeaders });
    } catch (error) {
      Sentry.captureException(error, { tags: { route: '/api/users', method: 'PATCH' } });
      return new NextResponse('Invalid request', { status: 400, headers: corsHeaders });
    }
  });
}

// DELETE – Delete user by ID (?id=uuid)
export async function DELETE(request: NextRequest) {
  return Sentry.startSpan({ name: 'users.DELETE', attributes: { path: '/api/users' } }, async () => {
    try {
      const id = request.nextUrl.searchParams.get('id');
      if (!id) {
        return new NextResponse('Missing id', { status: 400, headers: corsHeaders });
      }

      await prisma.user.delete({ where: { id } });
      return new NextResponse(null, { status: 204, headers: corsHeaders });
    } catch (error) {
      Sentry.captureException(error, { tags: { route: '/api/users', method: 'DELETE' } });
      return new NextResponse('Invalid request', { status: 400, headers: corsHeaders });
    }
  });
}
