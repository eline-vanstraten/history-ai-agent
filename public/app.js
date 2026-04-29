import { micromark } from 'https://esm.sh/micromark@3?bundle'

console.log("starting the front-end");

const inputField = document.querySelector("input");
const chatBox = document.querySelector("div")

const btn = document.querySelector("button");
btn.addEventListener("click", async (e) => {

    e.preventDefault();

    const userPrompt = inputField.value;


    const userDiv = document.createElement("div");
    userDiv.innerText = userPrompt;
    userDiv.classList.add("user-bubble");

    chatBox.append(userDiv);

    inputField.value = "";

    await sendChat(userPrompt)
});


async function sendChat(prompt) {

    btn.classList.add("Disabled");
    btn.innerText = "Working..."


    const data = await fetch("./api/chat", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
    })

    const result = await data.json();


    console.log(result.response.answer)

    let agentDiv = document.createElement("div");
    let agentAnswer = document.createElement("div");
    let agentToolsUsed = document.createElement("div");

    agentAnswer.innerHTML = micromark(result.response.answer.message);
    agentToolsUsed.innerHTML = result.response.answer.toolsUsed;

    agentDiv.classList.add("agent-bubble");
    agentToolsUsed.classList.add("agent-tools");
    agentDiv.append(agentAnswer, agentToolsUsed)
    chatBox.append(agentDiv);

    btn.innerText = "Click";

}



