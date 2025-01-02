import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    });
    console.log(allUsers);

    return NextResponse.json({ allUsers }, { status: 201 });
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Users are not found", { status: 500 });
  }
}
