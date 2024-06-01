import os
import sys
from typing import List, Optional

from fastapi import FastAPI, UploadFile, File
from gemini import get_prompt_for_suno
from servers.suno import generate_suno_song
# from pyngrok import ngrok
import ngrok
import sys
import os
from pydantic import Field

data_folder = "./data/temp"
VIDEO_FILE_PATH = "./data/temp/video_file.mp4"
AUDIO_FILE_PATH = "./data/temp/audio_file.mp3"

app = FastAPI()

if os.environ.get("NGROK_AUTHTOKEN", ""):
    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else "8000"
    # public_url = ngrok.connect(port).public_url
    listener = ngrok.forward("localhost:8000", authtoken_from_env=True, domain="regular-adder-sadly.ngrok-free.app")
    # print(f"ngrok tunnel \'{public_url}\' -> \'http://127.0.0.1:{port}\'")


@app.post("/predict")
def predict(video_file: Optional[UploadFile], audio_file: Optional[UploadFile] = File(None)):
    result = ""
    # download file to local
    if video_file is not None:
        try:
            with open(VIDEO_FILE_PATH, 'wb') as f:
                while contents := video_file.file.read(1024 * 1024):
                    f.write(contents)
        except Exception as e:
            return {"message": "Error uploading video file"}
        finally:
            video_file.file.close()

    if audio_file is not None:
        try:
            with open(AUDIO_FILE_PATH, 'wb') as f:
                while contents := audio_file.file.read(1024 * 1024):
                    f.write(contents)
        except Exception as e:
            return {"message": "Error uploading audio file"}
        finally:
            audio_file.file.close()

    # run gemini model to get results
    result = get_prompt_for_suno(video_file_path=VIDEO_FILE_PATH, audio_file_path=AUDIO_FILE_PATH)

    # call suno to get results
    suno_song = generate_suno_song(rhyme=result['rhyme'], song_type=result['song_type'], title=result['title'])
    
    print(suno_song)

    # remove voice from suno results

    # change voice

    # merge back the results to suno results

    return result