import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.AI_APIKEY;

  if (!apiKey) {
    return NextResponse.json({ error: "AI_APIKEY is not configured on the server." }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const prompt = `
      Please review the following code snippet. Provide feedback on potential bugs, suggest improvements for performance and readability, and check for adherence to best practices. Structure your response in clear, easy-to-understand Markdown format.

      Here is the code:
      \`\`\`
      ${code}
      \`\`\`
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Failed to get review from AI" }, { status: 500 });
  }
}
