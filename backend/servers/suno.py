import requests

base_url='http://localhost:3000/api'
def generate_suno_song(rhyme: str, song_type: str, title: str):
    url = f"{base_url}/custom_generate"
    response = requests.post(
        url,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
        },              
        json={
            "prompt": rhyme,
            "make_instrumental": False,
            "wait_audio": True,
            "tags": song_type,
            "title": title
        }
    )
    result = response.json()
    print(result)
    return result
        
