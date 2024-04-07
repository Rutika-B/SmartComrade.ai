import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColr?: string;
  bgColr?: string;
}
const Heading = ({
  title,
  description,
  icon: Icon,
  iconColr,
  bgColr,
}: HeadingProps) => {
  return (
    <>
    <div className="px-3 lg:px-8 flex items-center gap-x-3 space-y-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColr)}>
        <Icon className={cn("w-10 h-10", iconColr)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    </>
  );
};

export default Heading;
