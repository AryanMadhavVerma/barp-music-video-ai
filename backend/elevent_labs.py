import dotenv
from elevenlabs import play
from elevenlabs.client import ElevenLabs
import os

dotenv.load_dotenv()

client = ElevenLabs(
  api_key=os.environ.get("ELEVEN_LABS_API_KEY") # Defaults to ELEVEN_API_KEY
)

def get_cloned_voice(file_path: str):
    voice = client.clone(
        name="unique-voice-name",
        description="",
        files=[file_path],
    )
    return voice
