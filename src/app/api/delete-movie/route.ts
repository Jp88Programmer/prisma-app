import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const searchParams = url.searchParams;

    const id = searchParams.get("id");
    console.log("🚀 ~ DELETE ~ id:", id);

    const db = await client.db("MovieDemo");

    if (!id) {
      return NextResponse.json(
        { message: "Movie ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .collection("movie")
      .deleteOne({ _id: new ObjectId(id) });
    console.log("🚀 ~ GET ~ result:", result);

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Movie deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting movie", error },
      { status: 500 }
    );
  }
}
