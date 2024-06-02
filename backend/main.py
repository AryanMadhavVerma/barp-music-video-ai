import json
import os
import sys
import time
import urllib.request
from typing import List, Optional

# from pyngrok import ngrok
from get_cloned_voice import get_cloned_voice
from fastapi import FastAPI, UploadFile, File, Request, Response, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
import ngrok 
from fastapi.staticfiles import StaticFiles
from gemini import get_prompt_for_suno
# from pyngrok import ngrok
from get_cloned_voice import get_cloned_voice
from pydantic import Field
from servers.suno import generate_suno_song
from utils.video_utils.combine_video_audio import combine_video_audio
from utils.voice_utils.clone_voice import clone_voice
from utils.voice_utils.generate_final_mix import generate_final_mix
import time
from google.cloud import storage


from utils.voice_utils.isolate_voice import isolate_vocals_and_instrumentals
from utils.voice_utils.pitch_correction import pitch_correction

data_folder = "./data/temp"
VIDEO_FILE_PATH = "./data/temp/video_file.mp4"
AUDIO_FILE_PATH = "./data/temp/audio_file.mp3"
SUNO_SONG_FILE_PATH = "./data/temp/suno_song.mp3"
DOMAIN_NAME = "regular-adder-sadly.ngrok-free.app"

app = FastAPI()

if os.environ.get("NGROK_AUTHTOKEN", ""):
    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else "8000"
    # public_url = ngrok.connect(port).public_url
    listener = ngrok.forward("localhost:8000", authtoken_from_env=True, domain=DOMAIN_NAME)
    # print(f"ngrok tunnel \'{public_url}\' -> \'http://127.0.0.1:{port}\'")


@app.post("/predict")
async def predict(video_file: Optional[UploadFile], audio_file: Optional[UploadFile] = File(None)):
    result = ""
    # download file to local
    print("-------")
    print(video_file)
    print(audio_file)
    print("-------")
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

    print("voice id start fetch")
    voice = await get_cloned_voice(AUDIO_FILE_PATH)
    voice_id = voice.voice_id
    print("voice id fetched")
    # call suno to get results
    # suno_song = generate_suno_song(rhyme=result['rhyme'], song_type=result['song_type'], title=result['title'])
    # with open('data.json', 'w') as f:
    #     json.dump(suno_song, f)
    # print(suno_song)
    # url_to_download = suno_song[0].get("audio_url", "")
    # # url_to_download = "https://audiopipe.suno.ai/?item_id=ba548df5-2661-4e30-a7da-89af95b3fce1"
    # headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    # tries, done = 0, False
    # while not done and tries <= 3:
    #     print("Try", tries)
    #     req = urllib.request.Request(url_to_download, headers=headers)
    #     try:
    #         with urllib.request.urlopen(req) as response, open(SUNO_SONG_FILE_PATH, 'wb') as out_file:
    #             out_file.write(response.read())
    #         done = True
    #     except Exception as e:
    #         # print(f'HTTP Error: {e.code} {e.reason}')
    #         print("Exception when downloading file")
    #     tries += 1
    #     time.sleep(20)
    # # remove voice from suno results

    ##assuming we get an mp3 back
    
    vocals, instrumental =  isolate_vocals_and_instrumentals(SUNO_SONG_FILE_PATH)
    cloned_voice = clone_voice(voice_path=vocals, human_voice_id=voice_id)
    print("this is the path of cloned voice", cloned_voice)
    print("this is the path of vocals", vocals)

    pitch_corrected_cloned_voice = pitch_correction(cloned_voice=cloned_voice, original_voice=vocals)
    print("pitch generated properly")

    print("path of pitch corrected voice", pitch_corrected_cloned_voice)
    print("oath of instrumental", instrumental)

    final_mix = generate_final_mix(background=SUNO_SONG_FILE_PATH, overlay=pitch_corrected_cloned_voice)
    print("final_mix path is", final_mix)
    final_video = combine_video_audio(video_file_path="./data/temp/video_file.mp4", audio_file_path=final_mix)

    upload_results_to_gcs()
    return {
        "message": "Success",
        "final_video": f"{DOMAIN_NAME}/static/final_video.mp4"
    }

app.mount("/static", StaticFiles(directory="data/temp"), name="static")

def upload_results_to_gcs():
    storage_client = storage.Client()
    bucket = storage_client.bucket("mayhem-hackathon")
    blob = bucket.blob("final_video.mp4")
    blob.upload_from_filename("./data/temp/final_video.mp4")
    blob.make_public()


# Helper function to handle byte-range requests
def range_requests(request, file_path):
    file_size = os.path.getsize(file_path)
    range_header = request.headers.get("range")
    if range_header:
        range_start, range_end = range_header.replace("bytes=", "").split("-")
        range_start = int(range_start)
        range_end = int(range_end) if range_end else file_size - 1
        content_length = (range_end - range_start) + 1
        with open(file_path, "rb") as file:
            file.seek(range_start)
            data = file.read(content_length)
            headers = {
                "Content-Range": f"bytes {range_start}-{range_end}/{file_size}",
                "Accept-Ranges": "bytes",
                "Content-Length": str(content_length),
                "Content-Type": "video/mp4",
            }
            return Response(data, status_code=206, headers=headers)
    else:
        with open(file_path, "rb") as file:
            data = file.read()
            headers = {
                "Content-Length": str(file_size),
                "Content-Type": "video/mp4",
                "Accept-Ranges": "bytes",
                "Content-Type": "video/mp4",
            }
            return Response(data, status_code=206, headers=headers)

@app.get("/static/{video_name}")
async def get_video(request: Request, video_name: str):
    print('here ...')
    file_path = os.path.join('data/temp', video_name)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="Video not found")
    return range_requests(request, file_path)


@app.get("/video/play")
async def video_endpoint():
    def iterfile():
        with open("data/temp/final_video.mp4", mode="rb") as file_like:
            yield from file_like

    return StreamingResponse(iterfile(), media_type="video/mp4")
