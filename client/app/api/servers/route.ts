import httpClient from "@/lib/http"
import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const { name, imageUrl } = await req.json();
    const response = await httpClient.post('server/create', {
      json: { name, imageUrl },
      headers: {
        'authorization':`Bearer-${userId}`,
      },
    }).json();
    // console.log(response, '[=> responseresponseresponseresponseresponse');
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 })
  };
}
