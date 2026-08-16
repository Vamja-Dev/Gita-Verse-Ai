import os
import json
from datasets import load_dataset
import datasets

def extract_audio():
    print("Initializing connection to Hugging Face dataset: JDhruv14/Bhagavad-Gita_Audio...")
    
    # Load dataset from Hugging Face with audio decoding disabled to bypass torchcodec/ffmpeg errors
    dataset = load_dataset("JDhruv14/Bhagavad-Gita_Audio", split="train", trust_remote_code=True)
    dataset = dataset.cast_column("audio", datasets.Audio(decode=False))
    
    output_dir = r"D:\gita_audio_output"
    os.makedirs(output_dir, exist_ok=True)
    
    total_records = len(dataset)
    success_count = 0
    missing_audio = 0
    failed_extractions = 0
    seen_ids = set()
    duplicate_ids = 0
    
    audio_map = {}
    
    print(f"Total records found in dataset: {total_records}")
    print(f"Starting audio extraction directly to {output_dir}...")
    
    for idx, item in enumerate(dataset):
        shloka_id = str(item.get("shloka_id", f"unknown_{idx}"))
        
        if shloka_id in seen_ids:
            duplicate_ids += 1
        else:
            seen_ids.add(shloka_id)
            
        audio_data = item.get("audio")
        if not audio_data:
            print(f"Missing audio for shloka_id: {shloka_id}")
            missing_audio += 1
            continue
            
        try:
            filename = f"{shloka_id}.wav"
            file_path = os.path.join(output_dir, filename)
            
            # When decode=False, audio_data can be a dict containing 'bytes' or a 'path'
            if isinstance(audio_data, dict) and "bytes" in audio_data and audio_data["bytes"]:
                with open(file_path, "wb") as f_out:
                    f_out.write(audio_data["bytes"])
            elif isinstance(audio_data, dict) and "path" in audio_data and audio_data["path"]:
                import shutil
                shutil.copy(audio_data["path"], file_path)
            else:
                # Fallback if bytes are stored under another key
                raise ValueError("Audio bytes not found in expected format.")
            
            # Populate audio map entry
            audio_map[shloka_id] = f"/audio/{filename}"
            success_count += 1
            
        except Exception as e:
            print(f"Failed extraction for {shloka_id}: {str(e)}")
            failed_extractions += 1

    # Save audio-map.json in D drive
    map_file_path = os.path.join(output_dir, "audio-map.json")
    with open(map_file_path, "w", encoding="utf-8") as f:
        json.dump(audio_map, f, indent=4)
        
    print("\n==============================")
    print("EXTRACTION & VALIDATION REPORT")
    print("==============================")
    print(f"Total records: {total_records}")
    print(f"Successfully extracted: {success_count}")
    print(f"Missing audio: {missing_audio}")
    print(f"Duplicate shloka IDs: {duplicate_ids}")
    print(f"Failed extractions: {failed_extractions}")
    print(f"Audio map and all files successfully saved to: {output_dir}")

if __name__ == "__main__":
    extract_audio()