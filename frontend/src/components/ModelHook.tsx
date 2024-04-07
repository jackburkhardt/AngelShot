import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { OPENAI_API_KEY } from '../aws';

interface ModelHookConfig {
    conversation_history: ChatCompletionMessageParam[];
    who: string;
    gender: string;
    situation: string;
}

export async function ModelHook(config: ModelHookConfig) {
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true     
});

    // if no convo history, put in engineered prompt
    if (config.conversation_history.length === 0) {
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

    console.log(response.choices[0].message.content);
    config.conversation_history.push(response.choices[0].message);
}