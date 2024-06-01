import dotenv
from elevenlabs.client import ElevenLabs
import os

dotenv.load_dotenv()

client = ElevenLabs(
  api_key="ea3d93d2636da80240545f56f82bd13f" # Defaults to ELEVEN_API_KEY
)

async def get_cloned_voice(file_path: str):
    voice = client.clone(
        name="unique-voice-name",
        description="",
        files=[file_path],
    )
    return voice
