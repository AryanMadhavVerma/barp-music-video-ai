# BARP - Music Video Generator
Provided a video and audio in the user's voice, it generates a song using the voice in the uploaded audio. Final output is - the video + music.

## Development
- Add the secrets
  - Add Gemini API keys. Used for generating song lyrics & genre from video and the audio uploaded.
  - Get Suno.ai cookies - we use them to hit Suno API - Generates the song.
  - 11labs API keys, used for cloning the voice
 
- Run local server
  - The backend is python. We also have a server - Suno API server in node. Run this first followed by the backend server.
  - Frontend is react native written in Expo. Run the server, install expo go and test on local.

## Developed by
- Bikram - https://x.com/thebstar13
- Rajath - https://x.com/ayerajath
- Aryan Verma (AMV) - https://x.com/aryanmadhaverma
- Priyanshu - https://x.com/damnsirius
