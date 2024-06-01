import dotenv
dotenv.load_dotenv()

import os
import time
import google.generativeai as genai
from google.ai import generativelanguage as glm
from pydantic import BaseModel
import json

genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

person = glm.Schema(
    type = glm.Type.OBJECT,
    properties = {
        "data":  glm.Schema(type=glm.Type.STRING),
        "song_type":  glm.Schema(type=glm.Type.STRING),
    },
    required=["data", "song_type"]
)

class SongOutput(BaseModel):
    data: str
    song_type: str
    rhyme: str

def model_to_json(model_instance):
    return model_instance.model_dump_json()

def get_prompt_for_suno(video_file_path: str, audio_file_path: str) -> str:
    uploaded_files = []
    for file_path in [video_file_path, audio_file_path]:
        print(f"Uploading file...")
        file_upload = genai.upload_file(path=file_path)
        print(f"Completed upload: {file_upload.uri}")

        while file_upload.state.name == "PROCESSING":
            print('.', end='')
            time.sleep(10)
            file_upload = genai.get_file(file_upload.name)

        if file_upload.state.name == "FAILED":
            raise ValueError(file_upload.state.name)
        
        uploaded_files.append(file_upload)
        
    json_model = model_to_json(SongOutput(data="gloomy weather", song_type="sad, slow song", rhyme="yaad aaye woh pehli baarish jab tujhe ek nazar dekha tha"))
    prompt = f"""Make the output in a way 
        that we can feed this to an suno ai model (which is an prompt to song model)
        can you focus more on the scenery and the vibes of the place, 
        you do not need to focus on the background noise. 
        MAKE USE OF ALL THE FILES AND GENERATE THE OUTPUT FOR THE SAME. GENERATE A MINIMUM OF 15 WORDS. AND AN MAXIMUM OF 40 words.
        IF A SONG NEEDS TO BE GENERATED FROM THE OUTPUT, YOU ALSO NEED TO OUTPUT THE TYPE OF SONG THAT WOULD SUIT THE VIBE GIVEN.
        ALSO OUTPUT AN RHYME THAT CAN WORK WELL WITH THE GIVEN VIBE.
        PLEASE PROVIDE AN OUTPUT IN AN STRUCTURED FORMAT HAVING A MODEL LIKE: {json_model} ONLY RETURN THE JSON AS A STRING.
    """
    model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

    print("Making LLM inference request...")
    response = model.generate_content([prompt, file_upload], request_options={"timeout": 600})
    print(response.text)
    return json.loads(response.text)
        

if __name__ == "__main__":
    print(get_prompt_for_suno("./data/IMG_3288.MOV", "./data/Voice Recorder from Microphone.mp3"))
      
