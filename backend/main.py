from fastapi import FastAPI, UploadFile
from typing import List
from gemini import get_prompt_for_suno

app = FastAPI()
data_folder = "./data/temp"
VIDEO_FILE_PATH = "./data/temp/video_file.mp4"
AUDIO_FILE_PATH = "./data/temp/audio_file.mp3"

@app.post("/predict")
def predict(video_file: UploadFile, audio_file: UploadFile):
    result = ""
    # download file to local
    
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


    # remove voice from suno results

    # change voice

    # merge back the results to suno results

    return result