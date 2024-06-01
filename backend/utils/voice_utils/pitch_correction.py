import numpy as np
import soundfile as sf
import librosa

def pitch_correction(cloned_voice, original_voice):
    def load_and_get_pitch(filename):
        y, sr = librosa.load(filename, sr=None)
        # Separate harmonic and percussive components
        y_harm, y_perc = librosa.effects.hpss(y)
        pitches, magnitudes = librosa.piptrack(y=y_harm, sr=sr)
        # Extract the pitch
        pitch = np.max(pitches) if np.max(pitches) > 0 else 0
        return pitch, sr, y

    # Load files and detect pitch
    pitch_orig, sr_orig, y_orig = load_and_get_pitch(original_voice)
    pitch_vocals, sr_vocals, y_vocals = load_and_get_pitch(cloned_voice)

    # Calculate pitch shift
    if pitch_vocals > 0 and pitch_orig > 0:
        pitch_shift_needed = 12 * np.log2(pitch_orig / pitch_vocals)
    else:
        pitch_shift_needed = 0

    # Shift the pitch
    y_vocals_shifted = librosa.effects.pitch_shift(y=y_vocals, sr=sr_vocals, n_steps=pitch_shift_needed)

    # Save shifted vocals
    sf.write('./data/temp/pitch_corrected_voice.wav', y_vocals_shifted, sr_vocals)

    return './data/temp/pitch_corrected_voice.wav'