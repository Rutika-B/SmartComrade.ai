import { Key } from "react";

interface ImgFeedProps {
  data: string[];
}
const ImgFeed = ({ data }: ImgFeedProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.map((src: string | undefined) => (
        <div key={src}>
          <img
            className="h-80 w-full max-w-full rounded-lg object-cover object-center"
            src={src}
            alt="gallery-photo"
          />
        </div>
      ))}
    </div>
  );
};

export default ImgFeed;
