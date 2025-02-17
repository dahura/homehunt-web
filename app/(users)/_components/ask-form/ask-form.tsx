"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { useChatState } from "@/app/hooks/useChatStore";

export const AskForm = () => {
  const { state, formAction, pending } = useChatState();
  console.log({ state });

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
    <form action={formAction} className="flex gap-2">
      <Input
        type="text"
        placeholder="Ask a follow-up question..."
        className="flex-grow"
        name="prompt"
      />
      <Button type="submit" disabled={pending}>
        {pending ? (
          <Loader className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Plus className="w-4 h-4 mr-2" />
        )}
        Ask
      </Button>
    </form>
  );
};
