import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, posts, bio } = body;
    console.log("🚀 ~ POST ~ { email, name, posts, bio }:", { email, name, posts, bio })

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        posts: {
          create: { title: posts },
        },
        profile: {
          create: {
            bio,
          },
        },
      },
    });
    console.log("🚀 ~ POST ~ user:", user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
