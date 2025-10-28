import { SupabaseClient } from "@supabase/supabase-js";
import { ChatContent, ChatResponse } from "@/types";

export async function getGeminiResponse(
  supabase: SupabaseClient,
  prompt: string,
  history: ChatContent[]
): Promise<string> {
  try {
    // The invoke method is called to handle security (Authorization header)
    const { data, error } = await supabase.functions.invoke<ChatResponse>('gemini-chat', {
      method: 'POST',
      body: {
        prompt: prompt,
        history: history
      },
    });

    if (error) {
      console.error("Supabase Function Error:", error);
      throw new Error(`AI Request Failed: ${error.message}`);
    }

    if (data?.response) {
      return data.response;
    }

    throw new Error("No response data returned from the AI function.");

  } catch (error) {
    console.error("Caught error in API call:", error);
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to communicate with the Gemini service: ${errorMessage}`);
  }
}
