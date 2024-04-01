import { Comrade } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { MessageSquare } from "lucide-react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

interface ComradesProps {
  data: (Comrade & {
    _count: {
      messages: number;
    };
  })[];
}
const Comrades = ({ data }: ComradesProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill  alt="Empty" src="/empty.png" />
        </div>
        <p className="text-sm text-muted-foreground">No comrades found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl cursor-pointer text-center hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={item.src}
                  fill
                  className="rounded-xl object-cover"
                  alt="comrade"
                />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm">{item.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <p className="lowercase">@{item.username}</p>
              <div className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1" />
                <p>{item._count.messages}</p>
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Comrades;
