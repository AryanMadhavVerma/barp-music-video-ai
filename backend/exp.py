from voice_utils.isolate_voice import isolate_vocals_and_instrumentals
from voice_utils.clone_voice import clone_voice
from voice_utils.pitch_correction import pitch_correction
from voice_utils.generate_final_mix import generate_final_mix

def generate_music(file_path):
    vocals, instrumental =  isolate_vocals_and_instrumentals(file_path)
    cloned_voice = clone_voice(voice_path=vocals, human_voice_id="36OV89luoouTHbZHUWhv")
    print("this is the path of cloned voice", cloned_voice)
    print("this is the path of vocals", vocals)

    pitch_corrected_cloned_voice = pitch_correction(cloned_voice=cloned_voice, original_voice=vocals)
    print("pitch generated properly")

    print("path of pitch corrected voice", pitch_corrected_cloned_voice)
    print("oath of instrumental", instrumental)

    final_mix = generate_final_mix(background=file_path, overlay=pitch_corrected_cloned_voice)
    return "final mix generated succes"


try:
    generate_music("/Users/aryanverma/hackathon/backend/data/temp/Dance Through Life by amv.mp3")
except Exception as e:
    print(e)
    print("Error in generating vocals and instrumentals")