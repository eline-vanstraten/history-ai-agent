import { AzureChatOpenAI } from "@langchain/openai"
import { createAgent } from "langchain";
import { rollDice } from "./tools.js";

const model = new AzureChatOpenAI({ temperature: 0.2 });

const agent = createAgent({
    model,
    tools: [rollDice],
    systemPrompt: "Je bent iemand die alles weet over de geschiedenis tijdvakken voor zowel HAVO als VWO. Jij zorgt ervoor dat studenten de 10 tijdvakken onder de knie krijgen en de juiste volgorde ervan weten. Voor elk getal dat je gooit geef je het bijbehorende tijdvak.",
})

export async function callAgent() {

    const result = await agent.invoke({
        messages: [{ role: "user", content: "Welk getal heb je gegooid?" }],
    },
    );

    console.log(result.messages.at(-1).content);

    const finalMessage = result.messages.at(-1).content;

    return { answer: finalMessage };


}
