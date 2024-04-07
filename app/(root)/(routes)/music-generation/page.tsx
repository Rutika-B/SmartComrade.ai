"use client";
import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { formSchema } from "./constant";
import Empty from "@/components/empty";
const ImageGen = () => {
  const router = useRouter();
  const [music, setmusic] = useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setmusic(undefined);
      const response = await axios.post("/api/music-generation", values);

      setmusic(response.data.audio);
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
          title="Music generation"
          description="convert your prompt to music"
          icon={Music}
          iconColr="text-yellow-500"
          bgColr="bg-yellow-700/10"
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
          {!music && !isLoading && <Empty label="no music generated" />}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageGen;
