import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export interface ModelConfig {
    conversation_history: ChatCompletionMessageParam[];
    who: string;
    gender: string;
    situation: string;
}

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true     
});

export async function ModelChat(config: ModelConfig, setConversation: (config: ModelConfig) => void, transcriptionToSend: string) {


    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        messages: [...config.conversation_history, { role: "user", content: transcriptionToSend }]
    });

    if (response.choices.length === 0) {
        console.log("Error: No response from model!");
        return;
    }

    console.log(response.choices[0].message.content);

    new Promise((resolve) => {

    setConversation({
        ...config,
        conversation_history: [...config.conversation_history, { role: "user", content: transcriptionToSend }, response.choices[0].message]
    })
    
    resolve(null);

    }).then(() => {
        console.log(config);
        ModelTTS(config, response.choices[0].message.content ? response.choices[0].message.content : "Error: input to TTS is not a string!");
    });

}

export async function ModelTTS(config: ModelConfig, last_msg_text: string) {
    console.log("last_msg_text: ", last_msg_text);
    // if input isn't a string something is wrong
    if (typeof last_msg_text !== "string") {
        console.log("Error: input to TTS is not a string! Value: ", last_msg_text);
        last_msg_text = "Error: input to TTS is not a string!";
    }

    const response = await openai.audio.speech.create({
        model: "tts-1",
        input: last_msg_text,
        voice: config.gender === "Male" ? "onyx" : "alloy"
    });

    const response_blob = await response.blob();

    const blob = new Blob([response_blob], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
}