import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface BotAvtarProps {
  src: string;
}
const BotAvatar = ({ src }: BotAvtarProps) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
