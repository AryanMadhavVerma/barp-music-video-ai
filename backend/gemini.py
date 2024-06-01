import dotenv
dotenv.load_dotenv()

import os
import google.generativeai as genai

genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

video_file_name = "./data/IMG_3288.MOV"

print(f"Uploading file...")
video_file = genai.upload_file(path=video_file_name)
print(f"Completed upload: {video_file.uri}")

import time

while video_file.state.name == "PROCESSING":
    print('.', end='')
    time.sleep(10)
    video_file = genai.get_file(video_file.name)

if video_file.state.name == "FAILED":
  raise ValueError(video_file.state.name)


prompt = """Describe this video. Make the output in a way 
that we can feed this to an suno ai model (which is an prompt to song model)
can you focus more on the scenery and the vibes of the place, 
you do not need to focus on the background noise.
can you expand more on the same, make it around 20 words. 
"""
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

print("Making LLM inference request...")
response = model.generate_content([prompt, video_file],
                                  request_options={"timeout": 600})
print(response.text)

genai.delete_file(video_file.name)
print(f'Deleted file {video_file.uri}')