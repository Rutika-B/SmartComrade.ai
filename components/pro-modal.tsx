"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useProModal } from "@/hooks/use-pro-modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const ProModal = () => {
  const proModal = useProModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onSubscribe = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "something is wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">upgrade to pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            create
            <span className="mx-1 text-sky-500 font-medium">Custom AI</span>
            Comrades!
          </DialogDescription>
          <Separator />
          <div className="flex justify-between">
            <p>
              $9
              <span className="text-sm font-normal">.99/mo</span>
            </p>
            <Button disabled={loading} onClick={onSubscribe} variant="premium">
              Subscribe
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
