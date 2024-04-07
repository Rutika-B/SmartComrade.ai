import Image from "next/image";

const Empty = ({ label }: { label: string }) => {
  return (
    <div className="pt-10 flex flex-col items-center justify-center space-y-3">
      <div className="relative w-60 h-60">
        <Image fill alt="Empty" src="/empty.png" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Empty;
