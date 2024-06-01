from voice_utils.isolate_voice import isolate_vocals_and_instrumentals

def generate_vocals_and_instrumentals(file_path):
    return isolate_vocals_and_instrumentals(file_path)

try:
    print(generate_vocals_and_instrumentals("/Users/aryanverma/hackathon/backend/data/temp/Dance Through Life by amv.mp3"))
except Exception as e:
    print(e)
    print("Error in generating vocals and instrumentals")