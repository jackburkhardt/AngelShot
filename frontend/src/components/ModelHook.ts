import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { OPENAI_API_KEY } from '../aws';

interface ModelHookConfig {
    conversation_history: ChatCompletionMessageParam[];
    who: string;
    gender: string;
    situation: string;
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true     
});

export async function ModelHookChat(config: ModelHookConfig) {

    // if no convo history, put in engineered prompt
    if (config.conversation_history.length === 0) {
        console.log("No conversation history, adding prompt");
        config.conversation_history.push(
            {"role": "system", "content": `Pretend you are having a conversation with the user over the phone. 
            Only write exactly what you would say. 
            Speak in an informal, conversational tone. 
            Limit your responses to be no more than 2 sentences. Continue to ask followup questions to continue the conversation.  
            You are my ${config.gender} ${config.who} with my location.  Here is the situation: ${config.situation}`});
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        messages: config.conversation_history,
    });

    if (response.choices.length === 0) {
        console.log("Error: No response from model!");
        return;
    }

    console.log(response.choices[0].message.content);
    config.conversation_history.push(response.choices[0].message);

    return ModelHookTTS(config);
}

export async function ModelHookTTS(config: ModelHookConfig) {
    var last_msg_text = config.conversation_history[config.conversation_history.length - 1].content;

    // if input isn't a string something is wrong
    if (typeof last_msg_text !== "string") {
        console.log("Error: input to TTS is not a string! Value: ", last_msg_text);
        last_msg_text = "Error: input to TTS is not a string!";
    }

    const response = await openai.audio.speech.create({
        model: "tts-1",
        input: last_msg_text,
        voice: config.gender === "male" ? "onyx" : "alloy"
    });

    var response_blob = await response.blob();

    const blob = new Blob([response_blob], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
}