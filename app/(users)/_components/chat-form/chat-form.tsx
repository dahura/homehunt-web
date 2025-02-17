"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useEffect } from "react";

import { toast } from "sonner";
import { useChatState } from "@/app/hooks/useChatStore";

export const ChatForm = () => {
  const { state, formAction, pending } = useChatState();

  useEffect(() => {
    if (state?.errors) {
      toast.error(
        <ul>
          {Object.values(state.errors).map((error, index) => (
            <li key={error[index] || index}>{error[index]}</li>
          ))}
        </ul>
      );
    }
  }, [state]);

  return (
    <motion.form
      action={formAction}
      className="flex gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Input
        className="flex-1 h-10 px-4 sm:h-12 rounded-xl"
        placeholder="e.g. 3 bedroom apartment in Warsaw near metro station"
        name="prompt"
      />
      <Button
        type="submit"
        className="h-10 px-4 sm:h-12 sm:px-6 rounded-xl"
        disabled={pending}
      >
        {pending ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : "Search"}
      </Button>
    </motion.form>
  );
};
