import { NextResponse } from "next/server";
import axios from "axios";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    // const options = {
    //   method: "GET",
    //   url: "https://movies-api14.p.rapidapi.com/shows",
    //   headers: {
    //     "x-rapidapi-key": "2aaf4117e4msh16595dcc2458867p19e974jsn4d13e758a869",
    //     "x-rapidapi-host": "movies-api14.p.rapidapi.com",
    //   },
    // };

    // const response = await axios.request(options);
    // console.log(response.data);
    // return NextResponse.json({ data: response.data }, { status: 200 });

    const arr = await client
      .db("MovieDemo")
      .collection("movie")
      .find({})
      .toArray();
    // console.log("🚀 ~ GET ~ arr:", arr);
    return NextResponse.json({ data: arr }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
