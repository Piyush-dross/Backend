import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Use this tool to send an email.",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The HTML content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getPrintableText(message) {
  if (!message) {
    return "No response returned by the agent.";
  }

  if (typeof message.text === "string" && message.text.trim()) {
    return message.text;
  }

  if (typeof message.content === "string" && message.content.trim()) {
    return message.content;
  }

  if (Array.isArray(message.content)) {
    const textParts = message.content
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item?.type === "text" && typeof item.text === "string") {
          return item.text;
        }

        return "";
      })
      .filter(Boolean);

    if (textParts.length > 0) {
      return textParts.join("\n");
    }
  }

  return "The agent responded, but no printable text was returned.";
}

async function main() {
  const messages = [];

  try {
    while (true) {
      const userInput = await rl.question("\x1b[34myou:\x1b[0m ");

      if (!userInput.trim()) {
        continue;
      }

      if (userInput.toLowerCase() === "exit") {
        break;
      }

      messages.push(new HumanMessage(userInput));

      try {
        const response = await agent.invoke({ messages });
        const lastMessage = response.messages.at(-1);

        if (!lastMessage) {
          throw new Error("Agent returned no messages.");
        }

        messages.push(lastMessage);
        console.log(`\x1b[32m[AI]\x1b[0m ${getPrintableText(lastMessage)}`);
      } catch (error) {
        console.error("\x1b[31m[Error]\x1b[0m", error.message);
      }
    }
  } finally {
    rl.close();
  }
}

await main();
