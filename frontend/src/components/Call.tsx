import React, { useState, useEffect } from "react";
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
  LanguageCode,
} from "@aws-sdk/client-transcribe-streaming";
import MicrophoneStream from "microphone-stream";
import { Buffer } from "buffer";
import { Stack, Button } from "@mantine/core";
import { ModelChat, ModelConfig } from "./Model";

interface CallProps {
  situation: string;
  who: string;
  gender: string;
}

export function Call({ situation, who, gender }: CallProps) {
  const [fullRecording, setFullRecording] = useState("");
  const [transcriptionToSend, setTranscriptionToSend] = useState("");
  const [conversation, setConversation] = useState<ModelConfig>({
    conversation_history: [],
    who: who,
    situation: situation,
    gender: gender
  });

  let microphoneStream: MicrophoneStream | undefined = undefined; // CHANGE TYPE WHEN WE KNOW WHAT IT IS
  const language: LanguageCode = "en-US";
  const SAMPLE_RATE = 44100; // this is the sample rate in hertz
  let transcribeClient: TranscribeStreamingClient | undefined = undefined; // CHANGE TYPE WHEN WE KNOW WHAT IT IS

  useEffect(() => {
    startRecording(transcribeCallback);
    setConversation({
      ...conversation,
      conversation_history: [
        ...conversation.conversation_history,
        {role: "system", content: `Pretend you are having a conversation with the user over the phone. 
              Only write exactly what you would say. 
              Speak in an informal, conversational tone. 
              Limit your responses to be no more than 2 sentences. Continue to ask followup questions to continue the conversation.  
              You are my ${gender} ${who} with my location.  Here is the situation: ${situation}`},
      ],
    });
    //ModelChat(conversation, setConversation);
    return () => {
      stopRecording();
    };
  }, []);

  useEffect(() => {
    // API call to openAI
    console.log("transcriptionToSend", transcriptionToSend);
    if (fullRecording !== "") {
      setConversation({
        ...conversation,
        conversation_history: [...conversation.conversation_history, { role: "user", content: transcriptionToSend }],
      });
      ModelChat(conversation, setConversation, transcriptionToSend);
    }
    setTranscriptionToSend("");
  }, [fullRecording]);

  async function createMicrophoneStream() {
    /* 
    allows us to capture audio from the user’s microphone via getUserMedia
  */

    microphoneStream = new MicrophoneStream();
    microphoneStream.setStream(
      await window.navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      })
    );
  }

  async function createTranscribeClient() {
    /* 
    create a Transcribe client so that we can send the stream to Amazon
  */
    transcribeClient = new TranscribeStreamingClient({
      region: import.meta.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  function encodePCMChunk(chunk: Buffer) {
    // CHANGE CHUNK TYPE WHEN WE KNOW WHAT IT IS
    /* 
    convert the audio chunk to PCM format.
    use the MicrophoneStream library to convert the PCM chunk into raw data
    use the DataView object to convert the raw data into a buffer
  */
    const input = MicrophoneStream.toRaw(chunk);
    let offset = 0;
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return Buffer.from(buffer);
  }

  async function* getAudioStream() {
    for await (const chunk of microphoneStream as unknown as Iterable<Buffer>) {
      if (chunk.length <= SAMPLE_RATE) {
        yield {
          AudioEvent: {
            AudioChunk: encodePCMChunk(chunk),
          },
        };
      }
    }
  }

  async function startStreaming(language: string, callback: any) {
    const command = new StartStreamTranscriptionCommand({
      LanguageCode: language as LanguageCode,
      MediaEncoding: "pcm",
      MediaSampleRateHertz: SAMPLE_RATE,
      AudioStream: getAudioStream(),
    });
    const data = await transcribeClient.send(command);
    for await (const event of data.TranscriptResultStream) {
      const results = event.TranscriptEvent.Transcript.Results;
      if (results.length && !results[0]?.IsPartial) {
        const newTranscript = results[0].Alternatives[0].Transcript;
        // console.log(newTranscript);
        callback(newTranscript + " ");
      }
    }
  }

  function stopRecording() {
    console.log(microphoneStream, transcribeClient);
    if (microphoneStream) {
      console.log("stop microphoneStream");
      microphoneStream.stop();
      microphoneStream.destroy();
      microphoneStream = undefined;
    }
    if (transcribeClient) {
      console.log("stop transcribeClient");
      transcribeClient.destroy();
      transcribeClient = undefined;
    }
    setTranscriptionToSend("");
  }

  async function startRecording(callback: any) {
    if (!import.meta.env.VITE_AWS_REGION || !import.meta.env.VITE_AWS_ACCESS_KEY_ID || !import.meta.env.VITE_AWS_SECRET_ACCESS_KEY) {
      alert("Set AWS env variables first.");
      return false;
    }
    if (microphoneStream || transcribeClient) {
      stopRecording();
    }
    createTranscribeClient();
    createMicrophoneStream();
    await startStreaming(language, callback);
  }
  function transcribeCallback(text: string) {
    setTranscriptionToSend((prevTranscription) => prevTranscription + text);
    setFullRecording((prevFullRecording) => prevFullRecording + text);
  }

  return (
    <Stack justify="space-between" h={"100%"}>
      <Button size="lg" color="red" onClick={() => window.location.reload()}>
        Hang up
      </Button>
      <div>{transcriptionToSend}</div>
      <div>{fullRecording}</div>
    </Stack>
  );
}
