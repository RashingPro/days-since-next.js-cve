import { ADVISORY_FETCH_URL, GITHUB_API_BASE_URL } from "@/constants";

export async function getTime(timeout?: number) {
    const response = await fetch(GITHUB_API_BASE_URL + ADVISORY_FETCH_URL + "?per_page=1", {
        next: { revalidate: 60 * 60 * 12 },
        signal: timeout ? AbortSignal.timeout(timeout) : undefined
    });
    if (!response.ok) throw new Error(`GitHub API fetch error (status: ${response.status})`);
    const json = await response.json();
    if (Array.isArray(json) && json.length > 0) {
        const advisory = json[0];
        if (typeof advisory === "object" && typeof advisory.published_at === "string") {
            const date = Date.parse(advisory.published_at);
            const now = Date.now();
            return now - date;
        }
    }
    throw new Error("Bad data received from GitHub API");
}
