import { Geist, Geist_Mono } from "next/font/google";
import { PropsWithChildren } from "react";
import { getTime } from "@/server";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export async function generateMetadata(): Promise<Metadata> {
    let title = "Days without new Next.js vulnerability";
    try {
        const time = await getTime();
        const days = Math.ceil(time / (1000 * 60 * 60 * 24));
        title = `${days} ${days > 1 ? "days" : "day"} without Next.js vulnerability`;
    } catch (e) {
        console.error("Error in generateMetadata:", e);
    } finally {
        return {
            title,
            description:
                "This website keeps track of how many days have passed since last Next.js vulnerability discovered. Uses GitHub API."
        };
    }
}

export default function RootLayout({ children }: PropsWithChildren<{}>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="h-full w-full">{children}</body>
        </html>
    );
}
