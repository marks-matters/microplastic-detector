from software.illuminate_sample import illuminate_sample, cleanup
from software.capture_image import capture_image
from software.analyze_microplastics import analyze_microplastics

def run_capture_and_analysis():
    try:
        illuminate_sample()
        # Capture image with lights on
        path = capture_image()
        count, level = analyze_microplastics(path)
        print(f"Detected particles: {count} → Category: {level}")
    finally:
        # Ensure lights are turned off even if capture fails
        illuminate_sample(lights=False)
        cleanup()

if __name__ == "__main__":
    run_capture_and_analysis()