import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import ImgIO from "./components/imgPrompt";
import { v2 as cloudinary } from "cloudinary";
import ImgFeed from "./components/ImgFeed";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
const ImageGen = async () => {
  let imgList = [];

  try {
    const response = await cloudinary.search
      .expression(
        "folder:ai-images" //  cloudinary folder name
      )
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();
    imgList = response.resources.map((image: { url: string }) => image.url);
    console.log(imgList);
  } catch (error) {
    console.error("Error fetching cloudinary ai-images:", error);
  }

  return (
    <>
      <div>
        <Heading
          title="Image generation"
          description="convert your prompt to image"
          icon={MessageSquare}
          iconColr="text-pink-700"
          bgColr="bg-pink-700/10"
        />
        <div className="px-3 lg:px-8">
          <ImgIO />
          <ImgFeed data={imgList} />
        </div>
      </div>
    </>
  );
};

export default ImageGen;
