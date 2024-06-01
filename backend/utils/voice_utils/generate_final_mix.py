from pydub import AudioSegment

def generate_final_mix(background, overlay):
    # Load the audio tracks
    overlay = AudioSegment.from_wav(overlay)
    background = AudioSegment.from_file(background)

    # Reduce the background volume by 1-2 dB; test and adjust for desired "80%" effect
    reduced_background = background - 4  # Adjust dB here to fit the "80%" subjective requirement

    # Mixing the tracks (overlay the vocal track onto the background)
    final_mix = reduced_background.overlay(overlay, position=0)

    # Export the final mix to an MP3 file
    final_mix.export("./data/temp/final_song_mix.mp3", format="mp3")
    print("Final mix exported successfully.")
    return "./data/temp/final_song_mix.mp3"
