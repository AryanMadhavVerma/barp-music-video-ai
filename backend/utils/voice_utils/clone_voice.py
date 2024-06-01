import requests  # Used for making HTTP requests
import json  # Used for working with JSON data
from pydub import AudioSegment  # Used for audio processing

def clone_voice(voice_path, human_voice_id):
    # Define constants for the script
    CHUNK_SIZE = 1024  # Size of chunks to read/write at a time
    XI_API_KEY = "ea3d93d2636da80240545f56f82bd13f"  # Your API key for authentication
    VOICE_ID = human_voice_id  # ID of the voice model to use
    AUDIO_FILE_PATH = voice_path
    OUTPUT_PATH = "./data/temp/cloned_voice.mp3"

    # Construct the URL for the Speech-to-Speech API request
    sts_url = f"https://api.elevenlabs.io/v1/speech-to-speech/{VOICE_ID}/stream"

    # Set up headers for the API request, including the API key for authentication
    headers = {
        "Accept": "application/json",
        "xi-api-key": XI_API_KEY
    }

    # Set up the data payload for the API request, including model ID and voice settings
    # Note: voice settings are converted to a JSON string
    data = {
        "model_id": "eleven_english_sts_v2",
        "voice_settings": json.dumps({
            "stability": 0.5,
            "similarity_boost": 0.8,
            "style": 0.5,
            "use_speaker_boost": True
        })
    }

    # Set up the files to send with the request, including the input audio file
    files = {
        "audio": open(AUDIO_FILE_PATH, "rb")
    }

    # Make the POST request to the STS API with headers, data, and files, enabling streaming response
    response = requests.post(sts_url, headers=headers, data=data, files=files, stream=True)

    # Check if the request was successful
    if response.ok:
        # Open the output file in write-binary mode
        with open(OUTPUT_PATH, "wb") as f:
            # Read the response in chunks and write to the file
            for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
                f.write(chunk)
        # Inform the user of success
        print("Audio stream saved successfully.")
        audio = AudioSegment.from_file(OUTPUT_PATH)
        audio.export("./data/temp/cloned_voice.wav", format="wav")


        return "./data/temp/cloned_voice.wav"
    else:
        # Print the error message if the request was not successful
        print(response.text)

    