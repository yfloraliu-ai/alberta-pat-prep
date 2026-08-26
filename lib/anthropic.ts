import Anthropic from "@anthropic-ai/sdk";

export const MODEL = "claude-opus-5";

// Returns a client when ANTHROPIC_API_KEY is configured, otherwise null so
// callers can fall back to demo mode. The key never leaves the server.
export function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  return new Anthropic();
}

export function extractText(message: Anthropic.Message): string {
  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
}

// Claude is asked to reply with a JSON object; tolerate a fenced code block.
export function parseJsonResponse<T>(text: string): T {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in model response");
  }
  return JSON.parse(raw.slice(start, end + 1)) as T;
}

export function apiErrorMessage(error: unknown): { status: number; message: string } {
  if (error instanceof Anthropic.AuthenticationError) {
    return { status: 500, message: "Invalid Anthropic API key. Check ANTHROPIC_API_KEY on the server." };
  }
  if (error instanceof Anthropic.RateLimitError) {
    return { status: 429, message: "Rate limited by the Claude API. Please try again in a moment." };
  }
  if (error instanceof Anthropic.APIError) {
    return { status: 502, message: `Claude API error (${error.status}): ${error.message}` };
  }
  return { status: 500, message: "Unexpected server error. Please try again." };
}
