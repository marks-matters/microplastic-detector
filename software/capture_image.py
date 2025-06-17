import os
import subprocess
from datetime import datetime

def capture_image(output_dir="captures"):
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    image_path = f"{output_dir}/sample_{timestamp}.jpg"
    
    print(f"Capturing image to {image_path}...")
    result = subprocess.run(["libcamera-still", "-o", image_path, "--nopreview", "--timeout", "1000"])
    
    if result.returncode != 0:
        raise RuntimeError("Image capture failed. Check camera connection and permissions.")
    
    return image_path