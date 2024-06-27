import { useToast } from "@/components/ui/use-toast";
import React, { useEffect } from "react";

export default function useToaster({
  isError,
  defaultErrorMsg,
  isSuccess,
  defaultSuccessMsg,
}: {
  isError?: boolean;
  isSuccess?: boolean;
  defaultErrorMsg?: string;
  defaultSuccessMsg?: string;
}) {
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        description: defaultErrorMsg || "An error occurred",
        variant: "destructive",
      });
    }

    if (isSuccess) {
      toast({
        description: defaultSuccessMsg || "Action was successful",
      });
    }
  }, [isError, isSuccess]);

  return null;
}
