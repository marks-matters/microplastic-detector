from software.capture_image import capture_image
from software.analyze_microplastics import analyze_microplastics

def run_capture_and_analysis():
    path = capture_image()
    count, level = analyze_microplastics(path, show_plot=False)
    print(f"Detected particles: {count} → Category: {level}")

if __name__ == "__main__":
    run_capture_and_analysis()