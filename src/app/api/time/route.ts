import { NextResponse } from "next/server";
import { getTime } from "@/server";

export async function GET(): Promise<NextResponse> {
    try {
        return NextResponse.json({ time: await getTime() });
    } catch (err) {
        if (err instanceof Error) return NextResponse.json({ error: err.message }, { status: 500 });
        throw err;
    }
}
