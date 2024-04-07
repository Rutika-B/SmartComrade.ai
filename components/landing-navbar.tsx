"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth, useAuth } from "@clerk/nextjs";

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="flex justify-between items-center p-3 bg-transparent">
      <Link href="/" className="flex items-center">
        <h1
          className={cn(
            "hidden md:block text-xl md:text-2xl font-bold text-white"
          )}
        >
          SmartComrade.ai
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/comrade" : "/sign-in"}>
          <Button>Get started</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;
