import os
import sys
from typing import List, Optional

# from pyngrok import ngrok
from get_cloned_voice import get_cloned_voice
from fastapi import FastAPI, UploadFile, File
from gemini import get_prompt_for_suno
from pydantic import Field
from servers.suno import generate_suno_song
import sys
import os
import urllib.request
from utils.video_utils.combine_video_audio import combine_video_audio
from utils.voice_utils.isolate_voice import isolate_vocals_and_instrumentals
from utils.voice_utils.clone_voice import clone_voice
from utils.voice_utils.pitch_correction import pitch_correction
from utils.voice_utils.generate_final_mix import generate_final_mix



data_folder = "./data/temp"
VIDEO_FILE_PATH = "./data/temp/video_file.mp4"
AUDIO_FILE_PATH = "./data/temp/audio_file.mp3"
SUNO_SONG_FILE_PATH = "./data/temp/suno_song.mp3"

app = FastAPI()

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

    voice = await get_cloned_voice(AUDIO_FILE_PATH)
    voice_id = voice.get("voice_id", "")

    # call suno to get results
    suno_song = generate_suno_song(rhyme=result['rhyme'], song_type=result['song_type'], title=result['title'])
    print(suno_song)
    url_to_download = suno_song.get("audio_url", "")
    url_to_download = "https://audiopipe.suno.ai/?item_id=f22d86ef-3d17-4fc4-9f58-f25e1621f6b3"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    req = urllib.request.Request(url_to_download, headers=headers)

    
    try:
        with urllib.request.urlopen(req) as response, open(SUNO_SONG_FILE_PATH, 'wb') as out_file:
            out_file.write(response.read())
    except Exception as e:
        print(f'HTTP Error: {e.code} {e.reason}')
    # remove voice from suno results

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

    return {
        "message": "Success",
        "final_video": "final_video.mp4"
    }

