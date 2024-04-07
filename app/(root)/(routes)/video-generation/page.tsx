"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import Heading from "@/components/heading";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { formSchema } from "./constant";
import Empty from "@/components/empty";

const ImageGen = () => {
  const router = useRouter();
  const [video, setvideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setvideo(undefined);
      const response = await axios.post("/api/video-generation", values);

      setvideo(response.data[0]);
      form.reset();
      toast({
        description: "success",
      });
    } catch (error) {
      toast({
        description: "something went wrong",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  };
  return (
    <>
      <div>
        <Heading
          title="video generation"
          description="convert your prompt to video"
          icon={Video}
          iconColr="text-orange-700"
          bgColr="bg-orange-700/10"
        />
        <div className="px-3 lg:px-8">
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
                  <FormItem className="col-span-12 lg:col-span-10 ">
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
              <p>Loading...</p>
            </div>
          )}
          {!video && !isLoading && <Empty label="no video generated" />}
          {video && (
            <video
              controls
              className="w-full aspect-video mt-8 rounded-lg bg-black"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageGen;
