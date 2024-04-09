We won the Wildhacks 2024 Third Place Overall! Check out our DevPost: https://devpost.com/software/angel-shot-u1igqc

## Uncomfortable situations are all too common

It could be that you're walking alone in the dark, someone won't leave you alone, or maybe your Uber/cab driver is taking an unfamiliar route. In many of these situations, some people like to be on a phone call with another person.

## Why is being on a call more safe?

- It implies that someone knows your location and where you are going
- It gives you an excuse to leave a situation to handle something (like an emergency)
- You don't have to engage with other people
- It alerts others to your presence

## How does it work?

Visit the website and select (or write!) your situation, who you want to "talk" to, and the tone of their voice (masculine/feminine). Then start talking like you're on the phone!

The site will send your voice data to AWS Transcribe. The transcription then is sent to an OpenAI chat model which is initially prompted with the context of your situation. The model's output it sent through an OpenAI text-to-speech (TTS) system to play through your phone as if someone is responding.
