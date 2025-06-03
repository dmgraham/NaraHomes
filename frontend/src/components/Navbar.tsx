"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-24">
      <Link href="/" className="flex items-center gap-2">
        <Home className="h-8 w-8" />
        <span className="text-3xl font-semibold">NaraHomes</span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/listings/search"
          className={cn(
            "flex items-center text gap-2 px-3 py-2 text-base font-medium transition-colors hover:text-sky-400 border-b-2 border-transparent",
            pathname === "/listings/search"
              ? "text-sky-400 border-sky-400"
              : "text-foreground"
          )}
        >
          <Search className="h-4 w-4" />
          Search
        </Link>
        <Link
          href="/listings"
          className={cn(
            "px-3 py-2 text-base font-medium transition-colors hover:text-sky-400 border-b-2 border-transparent",
            pathname === "/listings"
              ? "text-sky-400 border-sky-400"
              : "text-foreground"
          )}
        >
          Listings
        </Link>
      </nav>
    </header>
  );
}
