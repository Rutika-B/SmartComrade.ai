import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}
const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="ircqsvw7"
      >
        <div className="p-4 space-y-2  border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="upload"
              src={value || "/placeholder.svg"}
              className="rounded-lg object-cover"
            ></Image>
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
