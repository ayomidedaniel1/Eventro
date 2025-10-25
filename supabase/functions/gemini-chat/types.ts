export type Part = {
  text: string;
};

export type Content = {
  role: "user" | "model";
  parts: Part[];
};

export type Payload = {
  contents: Content[];
};

export type RequestBody = {
  prompt: string;
  history?: Content[];
};