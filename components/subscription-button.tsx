"use client";

import { useState } from "react";
import axios from "axios";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}
const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={onClick}
      variant={isPro ? "default" : "premium"}
      size="sm"
    >
      {isPro ? "Manage subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
