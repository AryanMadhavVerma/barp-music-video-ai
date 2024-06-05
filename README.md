# BARP - Music Video Generator
Provided a video and a small audio in users voice, it generates a song using the voice uploaded audio & Gives the final output - the video + music.

## Development
- Add the secrets
  - Add Gemini API keys. Used for generating song lyrics & genre from video and the audio uploaded.
  - Get Suno.ai cookies - we use them to hit suno api - Generates the song.
  - 11labs api keys, used for cloning the voice
 
- Run local server
  - Backend is python. We also have a server - Suno api server in node. Run this first followed by the backend server.
  - Frontend is react native written in Expo. Run the server, install expo go and test on local.

