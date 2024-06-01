import os
import numpy as np
import librosa
import soundfile as sf
def isolate_vocals_and_instrumentals(file_path):
    # Load the audio file
    y, sr = librosa.load(file_path, duration=30)

    # Compute the spectrogram magnitude and phase
    S_full, phase = librosa.magphase(librosa.stft(y))

    # Apply a filter to reduce noise and improve separation
    S_filter = librosa.decompose.nn_filter(S_full,
                                           aggregate=np.median,
                                           metric='cosine',
                                           width=int(librosa.time_to_frames(2, sr=sr)))
    S_filter = np.minimum(S_full, S_filter)

    # Create masks for separating the vocals and instrumental
    margin_i, margin_v = 2, 10
    power = 2
    mask_i = librosa.util.softmask(S_filter,
                                   margin_i * (S_full - S_filter),
                                   power=power)
    mask_v = librosa.util.softmask(S_full - S_filter,
                                   margin_v * S_filter,
                                   power=power)

    # Apply the masks to separate the components
    S_foreground = mask_v * S_full
    S_background = mask_i * S_full

    # Convert the spectrograms back to time-domain audio
    vocal_audio = librosa.istft(S_foreground * phase)
    instrumental_audio = librosa.istft(S_background * phase)

    # Define the directory to save the files
    temp_dir = os.path.join('..', 'data', 'temp')  # Correctly adjusted relative path
 # Adjusted relative path to the temp folder

    # Ensure the directory exists
    os.makedirs(temp_dir, exist_ok=True)

    # Define the paths for the output files
    vocal_path = os.path.join(temp_dir, os.path.basename(file_path).replace(".mp3", "_vocals.wav"))
    instrumental_path = os.path.join(temp_dir, os.path.basename(file_path).replace(".mp3", "_instrumental.wav"))
    
    # Save the separated audio files
    sf.write(vocal_path, vocal_audio, samplerate=sr, subtype='PCM_24')
    sf.write(instrumental_path, instrumental_audio, samplerate=sr, subtype='PCM_24')

    return "Vocals and instrumental tracks saved successfully."
