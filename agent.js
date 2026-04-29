import { AzureChatOpenAI } from "@langchain/openai"
import { createAgent } from "langchain";
import { getDocument ,rollDice } from "./tools.js";
import { MemorySaver } from "@langchain/langgraph";
import * as z from "zod";

const checkpointer = new MemorySaver();
const model = new AzureChatOpenAI({ temperature: 0.2 });

const myToolResponse = z.object({
    message: z.string().describe("The message to the user"),
    toolsUsed: z.array(z.string()).describe("List with names of tools used in the response, without the word function")
});

const agent = createAgent({
    model,
    responseFormat: myToolResponse,
    tools: [getDocument, rollDice],
    checkpointer,
    systemPrompt: "Je bent iemand die alles weet over de geschiedenis tijdvakken voor zowel HAVO als VWO. Jij zorgt ervoor dat studenten de 10 tijdvakken onder de knie krijgen en de juiste volgorde ervan weten. Voor elk getal dat je gooit geef je het bijbehorende tijdvak uit de document.",
})

export async function callAgent(prompt) {

    const result = await agent.invoke({
        messages: [{ role: "user", content: prompt }],
    },
        { configurable: { thread_id: "1" } }
    );

    console.log(result.messages.at(-1).content);

    const finalMessage = result.structuredResponse;

    return { answer: finalMessage };


}
