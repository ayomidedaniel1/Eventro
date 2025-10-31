// deno-lint-ignore-file
import { Content, Payload, RequestBody } from "./types.ts";

export const config = {
  auth: false,
};

Deno.serve(async (req: Request) => {
  // Authentication and Setup
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  if (!GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "GEMINI_API_KEY not configured in environment variables.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Only POST is supported." }),
      { status: 405, headers: { "Content-Type": "application/json" } },
    );
  }

  let requestBody: RequestBody;
  try {
    requestBody = await req.json();
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body provided." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { prompt, history } = requestBody;

  if (!prompt) {
    return new Response(
      JSON.stringify({ error: "Missing 'prompt' in request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // LOGIC FOR SEARCH REFINEMENT

  const isSearchRefinerRequest = !history;

  const systemInstructionText = isSearchRefinerRequest
    ? "You are an AI search query refiner. Your only job is to analyze the user's input, which is a search term for an event finding app, and return a single, concise keyword or phrase suitable for a database search. Do not include any explanations, greetings, or punctuation other than the search term itself."
    : undefined;

  const contents: Content[] = history || [];

  // Add the current user prompt
  contents.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  const payload: Payload = {
    contents: contents,
  };

  if (systemInstructionText) {
    payload.generationConfig = {
      systemInstruction: {
        parts: [{ text: systemInstructionText }]
      }
    };
  }

  // Call the Gemini API
  try {
    const geminiResponse = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const geminiResult = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API Error:", geminiResult);
      return new Response(
        JSON.stringify({
          error: "External API error.",
          details:
            geminiResult.error?.message ||
            "Check function logs for details.",
        }),
        {
          status: geminiResponse.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const generatedText =
      geminiResult.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!generatedText) {
      console.error("No text generated:", geminiResult);
      return new Response(
        JSON.stringify({ error: "AI failed to generate content." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const responseBody = isSearchRefinerRequest
      ? { refinedQuery: generatedText }
      : { response: generatedText };

    return new Response(
      JSON.stringify(responseBody),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Caught internal error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error during API call.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
