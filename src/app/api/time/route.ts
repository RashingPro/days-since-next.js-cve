import { NextResponse } from "next/server";
import { ADVISORY_FETCH_URL, GITHUB_API_BASE_URL } from "@/constants";

export async function GET(): Promise<NextResponse> {
    const response = await fetch(GITHUB_API_BASE_URL + ADVISORY_FETCH_URL + "?per_page=1", {
        next: { revalidate: 60 * 60 * 12 }
    });
    if (!response.ok)
        return NextResponse.json({ message: `GitHub API fetch error (status: ${response.status})` }, { status: 500 });
    const json = await response.json();
    if (Array.isArray(json) && json.length > 0) {
        const advisory = json[0];
        if (typeof advisory === "object" && typeof advisory.published_at === "string") {
            const date = Date.parse(advisory.published_at);
            const now = Date.now();
            return NextResponse.json({ time: now - date });
        }
    }
    console.log(json);
    return NextResponse.json({ message: "Bad data received from GitHub API" }, { status: 500 });
}
