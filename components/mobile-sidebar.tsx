import Sidebar from "./Sidebar";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Mobilesidebar = ({isPro}:{isPro:boolean}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden pr-3" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default Mobilesidebar;
