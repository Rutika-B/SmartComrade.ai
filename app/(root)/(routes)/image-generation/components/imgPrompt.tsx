"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { amountOptions, formSchema, resolutionOptions } from "../constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Download } from "lucide-react";
import * as z from "zod";
import { Loader } from "@/components/loader";

const ImgIO = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);
      const response = await axios.post("/api/image-generation", values);
      const urls = response.data.map((image: { url: string }) => image.url);

      if (urls) {
        const imageUrl = urls[0];

        const payload = {
          url: imageUrl,
        };
        //upload generated ai image on cloudinary
        const imgRes = await axios.post("/api/ai-img-upload", payload);
      }

      setPhotos(urls);
      router.refresh();
      toast({
        description: "success",
      });
    } catch (error) {
      toast({
        description: "something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
            rounded-lg
            border
            p-4
            px-3
            lg:px-8
            focus-within:shadow-sm
            grid
            grid-cols-12
            w-full
            gap-2
            bg-primary/10
        "
        >
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6 ">
                <FormControl>
                  <Input
                    className="border-0 outline-none bg-primary/10 "
                    placeholder="Imagine..."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {amountOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="resolution"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resolutionOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="col-span-12 md:col-span-2 w-full"
            size="icon"
          >
            Generate
          </Button>
        </form>
      </Form>
      {isLoading && (
        <div className="p-20">
          <Loader/>
        </div>
      )}
      {/* {photos.length === 0 && !isLoading && (
        <Empty label="no images generated" />
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {photos.map((src) => (
          <Card key={src} className="rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image fill alt="Generated" src={src} />
            </div>
            <CardFooter className="p-2">
              <Button
                onClick={() => window.open(src)}
                variant="secondary"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImgIO;
