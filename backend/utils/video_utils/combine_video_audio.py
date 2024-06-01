from moviepy.editor import VideoFileClip, AudioFileClip

def combine_video_audio(video_file_path, audio_file_path):
    # Load the video file
    video_clip = VideoFileClip(video_file_path).subclip(0, 30)  # Trim to the first 30 seconds

    # Load the audio file and trim to the first 30 seconds
    audio_clip = AudioFileClip(audio_file_path).subclip(0, 30)

    # Set the audio of the video clip as the audio clip
    final_clip = video_clip.set_audio(audio_clip)

    # Write the result to a file (can be mp4, mkv, etc.)
    final_clip.write_videofile("./data/temp/final_video.mp4", codec='libx264', audio_codec='aac')

    print(f"Video and audio have been combined and saved")
    return "./data/temp/final_video.mp4"
