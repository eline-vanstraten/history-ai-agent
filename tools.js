import { tool } from "langchain";

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
                sides: { type: "string" },
            },
            required: ["sides"],
        },
    },
);