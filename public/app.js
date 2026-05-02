import { micromark } from 'https://esm.sh/micromark@3?bundle'

console.log("starting the front-end");

const inputField = document.querySelector("input");
const chatBox = document.querySelector("#chat-container")

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
    btn.disabled = true;
    btn.innerText = "Loading..."

    try {
        const data = await fetch("./api/chat", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        })

        const result = await data.json();


        console.log(result.answer)

        let agentDiv = document.createElement("div");
        let agentAnswer = document.createElement("div");
        let agentToolsUsed = document.createElement("div");

        if (result.answer.imageUrl) {
            let historicalImage = document.createElement("img");
            historicalImage.src = result.answer.imageUrl;
            historicalImage.classList.add("history-image");

            //elke keer als er nieuw tijdvak is word de foto aangepast naar de bijpassende, veranderen css variabele
            document.body.style.setProperty('--bg-image', `url('${result.answer.imageUrl}')`);

            historicalImage.alt = "Historisch beeld";
            agentDiv.append(historicalImage);
        }

        agentAnswer.innerHTML = micromark(result.answer.message);
        agentToolsUsed.innerHTML = result.answer.toolsUsed;

        agentDiv.classList.add("agent-bubble");
        agentToolsUsed.classList.add("agent-tools");
        agentDiv.append(agentAnswer, agentToolsUsed)
        chatBox.append(agentDiv);

        btn.disabled = false;
        btn.innerText = "Send";
    } catch (error) {
        console.error("Something goes wrong:", error);
        btn.disabled = false;
    }

}


sendChat("introduceer jezelf en vertel waarvoor je bent. Vraag ze of ze willen beginnen met het leren van de kenmerkende aspecten en of ze de dobbelsteen willen gooien. Pas zodra een dobbelsteen is gegooid geef je een tijdvak, de kenmerkende aspecten en een bijpassende image.")



