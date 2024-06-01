import os
import sys
from typing import List

from elevent_labs import get_cloned_voice
from fastapi import FastAPI, UploadFile
from gemini import get_prompt_for_suno
from pyngrok import ngrok
from servers.suno import generate_suno_song

data_folder = "./data/temp"
VIDEO_FILE_PATH = "./data/temp/video_file.mp4"
AUDIO_FILE_PATH = "./data/temp/audio_file.mp3"

app = FastAPI()

if os.environ.get("NGROK_AUTHTOKEN", ""):
    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else "8000"
    public_url = ngrok.connect(port).public_url
    print(f"ngrok tunnel \'{public_url}\' -> \'http://127.0.0.1:{port}\'")



@app.post("/predict")
def predict(video_file: UploadFile, audio_file: UploadFile):
    result = ""    
    try:
        with open(VIDEO_FILE_PATH, 'wb') as f:
            while contents := video_file.file.read(1024 * 1024):
                f.write(contents)
    except Exception as e:
        return {"message": "Error uploading video file"}
    finally:
        video_file.file.close()

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
    
    # remove voice from suno results
    ## clone voice
    cloned_voice = get_cloned_voice(file_path=AUDIO_FILE_PATH)

    # change voice

    # merge back the results to suno results

    return result