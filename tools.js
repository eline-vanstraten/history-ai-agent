import { tool } from "langchain";
import { AzureOpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

const embeddings = new AzureOpenAIEmbeddings({
    temperature: 0,
    azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_EMBEDDING_DEPLOYMENT_NAME
});

const vectorStore = await FaissStore.load("./vectordb", embeddings);
console.log("✅ vector store loaded!")

export const getDocument = tool(
    async ({ query }) => {
        console.log("🔧 now searching the document store")

        const relevantDocs = await vectorStore.similaritySearch(query, 2)

        const context = relevantDocs.map(doc => doc.pageContent).join("\n\n");

        return context
    }, {
    name: "get_document",
    description: "Retrieve details from the kenmerkende aspecten.",
    schema: {
        "type": "object",
        "properties": { "query": { "type": "string" } },
        "required": ["query"]
    }
}
)

export const rollDice = tool(
    ({ sides }) => {

        console.log(`🔧  Ik rol een ${sides}-sided dobbelsteen!`)

        return Math.floor(Math.random() * sides) + 1
    },
    {
        name: "roll_dice",
        description: "Gooi een 10 zijdige dobbelsteen",
        schema: {
            type: "object",
            properties: {
                sides: { type: "number" },
            },
            required: ["sides"],
        },
    },
);