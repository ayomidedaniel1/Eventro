import { SupabaseClient } from "@supabase/supabase-js";

// Define the shape of the data we send and receive
type ChatContent = {
  role: "user" | "model";
  parts: { text: string; }[];
};

type ChatResponse = {
  response: string;
};

/**
 * Sends a message to the deployed Supabase Edge Function for Gemini chat.
 * @param supabase The initialized Supabase client instance.
 * @param prompt The current user input message.
 * @param history The preceding conversation history.
 * @returns The AI's generated text response.
 */
export async function getGeminiResponse(
  supabase: SupabaseClient,
  prompt: string,
  history: ChatContent[]
): Promise<string> {
  try {
    // The invoke method automatically handles security (Authorization header)
    // and correctly constructs the POST request to your deployed function.
    const { data, error } = await supabase.functions.invoke<ChatResponse>('gemini-chat', {
      method: 'POST',
      body: {
        prompt: prompt,
        history: history
      },
    });

    if (error) {
      console.error("Supabase Function Error:", error);
      // For user-facing error messages:
      throw new Error(`AI Request Failed: ${error.message}`);
    }

    if (data?.response) {
      return data.response;
    }

    throw new Error("No response data returned from the AI function.");

  } catch (error) {
    console.error("Caught error in API call:", error);
    // Ensure we throw a proper Error instance for better handling in components
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to communicate with the Gemini service: ${errorMessage}`);
  }
}
