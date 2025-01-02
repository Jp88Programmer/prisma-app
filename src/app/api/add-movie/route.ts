import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const cli = await client;
    const db = cli.db("MovieDemo");

    const movieData = await request.json();

    if (movieData.type) {
      const type = movieData.type.split(",").map((item: string) => item.trim());
      movieData.type = type;
    }

    const result = await db.collection("movie").insertOne({
      ...movieData,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Movie added successfully",
        movieId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error adding movie",
        error,
      },
      { status: 500 }
    );
  }
}
