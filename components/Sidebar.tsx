"use client";

import {  Home, Image, Music, Plus, Settings, Video } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

import { cn } from "@/lib/utils";

interface SidebarProps {
  isPro: boolean;
}
const Sidebar = ({ isPro }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const proModal = useProModal();
  const routes = [
    {
      icon: Home,
      href: "/comrade",
      label: "Comrades",
      colr:"text-green-700",
      pro: false,
    },
    {
      icon: Image,
      href: "/image-generation",
      label: "Image generation",
      colr:"text-pink-700",
      pro: false,
    },
    {
      icon: Video,
      href: "/video-generation",
      label: "Video generation",
      colr: "text-orange-700",
      pro: false,
    },
    {
      icon: Music,
      href: "/music-generation",
      label: "Music generation",
      colr:"text-yellow-500",
      pro: false,
    },
    // {
    //   icon: Plus,
    //   href: "/comrade/new",
    //   label: "Create",
    //   pro: true,
    // },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      colr:"text-cyan-500",
      pro: false,
    },
  ];
  const onnavigate = (url: string, pro: boolean) => {
    if (pro && !isPro) {
      return proModal.onOpen();
    }
    return router.push(url);
  };
  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onnavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-row gap-y-2 items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3",route.colr)} />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
