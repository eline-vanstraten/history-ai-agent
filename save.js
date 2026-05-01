import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { AzureOpenAIEmbeddings, AzureChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

const files = ["./public/Kenmerkende-Aspecten-per-Tijdvak.pdf", "./public/Kenmerkende-Aspecten-uitleg.pdf"];

const embeddings = new AzureOpenAIEmbeddings({
    temperature: 0,
    azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_EMBEDDING_DEPLOYMENT_NAME
});

const model = new AzureChatOpenAI({ temperature: 0.2 });

//array voor alle informatie uit de pdfs
const allDocs = [];

//voor beide pdfs om ze allebei te lezen
for (const file of files) {
    const loader = new PDFLoader(file)
    const docs = await loader.load()
    //spread operator, haalt alle items uit de docs en stopt ze in alldocs, hierdoor informatie uit beide pdfs op 1 plek
    allDocs.push(...docs);
}

// opsplitsen
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
const chunks = await textSplitter.splitDocuments(allDocs);

// log
console.log(`Er zijn ${chunks.length} chunks. De eerste chunk is:`);
console.log(chunks[0]);

//chunck in de vectorstore plaatsen
console.log("creating embeddings... saving in vectorstore...")

const vectorStore = new FaissStore(embeddings, {});
await vectorStore.addDocuments(chunks);
console.log("✅ vector store created!")
await vectorStore.save("./vectordb"); 
console.log("✅ vector store saved!")


const prompt = "Welke kenmerkende aspecten bevat tijdvak 1"
const relevantDocs = await vectorStore.similaritySearch(prompt);

console.log("\n--- BRON CHECK ---");
//check voor juiste docs, voor elke docs die relevant is checken waar de informatie vandaan komt, bestandsnaam ophalen 
relevantDocs.forEach((doc, index) => {
    const bron = doc.metadata.source.split('/').pop();
    console.log(`Fragment ${index + 1} komt uit: ${bron}`)
})

const context = relevantDocs.map(doc => doc.pageContent).join("\n\n")

console.log(`Found ${relevantDocs.length} relevant documents`)
console.log(context)


const response = await model.invoke(`je krijgt de volgende vraag : ${prompt}, geef het antwoord door deze tekst te lezen ${context}. Als het antwoord niet in de tekst staat, zeg dat dan eerlijk.`);

console.log(response.content)