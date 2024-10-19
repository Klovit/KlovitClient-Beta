"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const ErrorAlert: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const errorMessage = searchParams.get("error");
    if (errorMessage) {
      setError(errorMessage);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        duration: 5000,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [error, toast]);

  return null; // No need to render anything else
};

export default ErrorAlert;
