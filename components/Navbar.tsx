"use client";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import Mobilesidebar from "./mobile-sidebar";
import { useProModal } from "@/hooks/use-pro-modal";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface NavbarProps {
  isPro: boolean;
}
const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});
const Navbar = ({ isPro }: NavbarProps) => {
  const proModal = useProModal();
  return (
    <div className="fixed w-full  z-50 flex justify-between items-center py-3 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <Mobilesidebar isPro={isPro} />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-2xl font-bold text-primary",
              font.className
            )}
          >
            SmartComrade.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button size="sm" variant="premium" onClick={proModal.onOpen}>
            Upgrade
            <Sparkles className="h-4 w-4 fill-white ml-2" />
          </Button>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
