import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
  LanguageCode,
} from "@aws-sdk/client-transcribe-streaming";
import MicrophoneStream from "microphone-stream";
import { Buffer } from "buffer";
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "../aws";
import { Button } from "@mantine/core";

interface AudioRecorderProps {
  setFullRecording: (transcription: string) => void;
  setTranscriptionToSend: (transcription: string) => void;
  setProcess: (process: string) => void;
}

export function AudioRecorder({
  setFullRecording: setTranscription,
  setTranscriptionToSend,
  setProcess,
}: AudioRecorderProps) {
  let microphoneStream: MicrophoneStream | undefined = undefined; // CHANGE TYPE WHEN WE KNOW WHAT IT IS
  const language: LanguageCode = "en-US";
  const SAMPLE_RATE = 44100; // this is the sample rate in hertz
  let transcribeClient: TranscribeStreamingClient | undefined = undefined; // CHANGE TYPE WHEN WE KNOW WHAT IT IS
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
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
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
    setTranscription("");
  }

  async function startRecording(callback: any) {
    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
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

  function startCall() {
    startRecording(transcribeCallback);
    setProcess("call");
  }

  return (
    <div>
      <h2></h2>
      <div>
        <Button
          onClick={startCall}
          size="xl"
          style={{ padding: "10px" }}
          h={"100px"}
          w={"100px"}
          radius={"50%"}
        >
          Call me
        </Button>
      </div>
    </div>
  );
}
