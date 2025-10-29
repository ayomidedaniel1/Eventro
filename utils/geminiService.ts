import { SupabaseClient } from "@supabase/supabase-js";
import { ChatContent, ChatResponse } from "@/types";

type RefinedSearchResponse = {
  refinedQuery: string;
};

export async function getRefinedSearchQuery(
  supabase: SupabaseClient,
  prompt: string
): Promise<string> {
  try {
    // Reverting function name back to the correct one as confirmed by the user: 'gemini-chat'
    const { data, error } = await supabase.functions.invoke<RefinedSearchResponse>('gemini-chat', {
      method: 'POST',
      body: {
        prompt: prompt,
        // The Edge Function (gemini-chat) needs to be robust enough to handle the 
        // absence of 'history' for this specific call, or expect it to be passed 
        // as null/undefined. If it strictly requires 'history', it will fail 
        // until the Edge Function code is updated.
      },
    });

    if (error) {
      console.error("Supabase Search Refiner Function Error:", error, JSON.stringify(error, null, 2));
      throw new Error(`AI Request Failed: Edge Function returned a non-2xx status code (${error.status}) or error: ${error.message}`);
    }

    // This response structure is specifically expected from the search refinement logic 
    if (data?.refinedQuery) {
      return data.refinedQuery;
    }

    throw new Error("AI did not return a refined search query. Check Edge Function logs for details.");

  } catch (error) {
    console.error("Caught error in AI search call:", error);
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to communicate with the AI search service: ${errorMessage}`);
  }
}

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

    // This response structure is specifically expected from the chat logic.
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
