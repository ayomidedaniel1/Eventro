export type Part = {
  text: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
};

export type Content = {
  role: "user" | "model";
  parts: Part[];
};

export type GenerationConfig = {
  systemInstruction?: {
    parts: Part[];
  };
};

export type Payload = {
  contents: Content[];
  generationConfig?: GenerationConfig;
};

export type RequestBody = {
  prompt: string;
  history?: Content[];
};

export type ChatResponse = {
  response: string;
};

export type RefinedSearchResponse = {
  refinedQuery: string;
};
