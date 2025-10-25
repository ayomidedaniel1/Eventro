// deno-lint-ignore-file
import { Content, Payload, RequestBody } from "./types";

// Edge Functions config object
export const config = {
  auth: false,
};

/**
 * Handles the incoming request, constructs the Gemini API payload, and proxies the request.
 * @param req - The incoming request object.
 * @returns The generated content response or an error response.
 */
function handleRequest(req: Request): Promise<Response> {
  // 1. Authentication and Setup
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

  if (!GEMINI_API_KEY) {
    return Promise.resolve(
      new Response(
        JSON.stringify({
          error: "GEMINI_API_KEY not configured in environment variables.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      ),
    );
  }

  if (req.method !== "POST") {
    return Promise.resolve(
      new Response(
        JSON.stringify({ error: "Method not allowed. Only POST is supported." }),
        { status: 405, headers: { "Content-Type": "application/json" } },
      ),
    );
  }

  let requestBody: RequestBody;
  try {
    requestBody = await req.json();
  } catch (e) {
    return Promise.resolve(
      new Response(
        JSON.stringify({ error: "Invalid JSON body provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      ),
    );
  }

  const { prompt, history } = requestBody;

  if (!prompt) {
    return Promise.resolve(
      new Response(
        JSON.stringify({ error: "Missing 'prompt' in request body." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      ),
    );
  }

  // 2. Construct the Chat History and Request Payload
  const contents: Content[] = history || [];

  // Add the current user prompt
  contents.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  const payload: Payload = {
    contents: contents,
    // Add systemInstruction here if you want to set the model's persona
  };

  // 3. Call the Gemini API
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
      return Promise.resolve(
        new Response(
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
        ),
      );
    }

    const generatedText =
      geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error("No text generated:", geminiResult);
      return Promise.resolve(
        new Response(
          JSON.stringify({ error: "AI failed to generate content." }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        ),
      );
    }

    // 4. Return the successful response
    return Promise.resolve(
      new Response(
        JSON.stringify({
          response: generatedText,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );
  } catch (error) {
    console.error("Caught internal error:", error);
    return Promise.resolve(
      new Response(
        JSON.stringify({
          error: "Internal server error during API call.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      ),
    );
  }
}

// Export the handler for Supabase/Deno Deploy
export default handleRequest;