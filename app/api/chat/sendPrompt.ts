"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
  prompt: z.string({
    invalid_type_error: "Invalid Prompt",
  }),
});

export const sendPrompt = async (prevState: unknown, formData: FormData) => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const validatedFields = schema.safeParse({
    prompt: formData.get("prompt"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CORE_BACKEND_URL}/send-prompt`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: validatedFields.data.prompt }),
      }
    );

    const data = (await response.json()) as {
      promptId: string;
      prompt: string;
    };

    return { promptId: data.promptId, prompt: data.prompt };
  } catch (error) {
    console.error("Error sending prompt:", error);
    return { message: "Failed to send prompt" };
  }
};
