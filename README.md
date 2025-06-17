
# Microplastic Detector

A Python-based tool for analyzing fluorescence images to detect and categorize microplastic particles. This tool uses computer vision techniques to identify, count, and classify microplastic particles in fluorescence microscopy images.

## Features

- Automated detection of microplastic particles in fluorescence images
- Particle counting and size filtering
- Classification into Low/Medium/High concentration categories
- Visual output with multiple analysis stages
- Comprehensive test suite for reliability

## Prerequisites

- Python 3.13 or higher
- Virtual environment (included in repository)
- OpenCV
- NumPy
- Matplotlib
- pytest (for running tests)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd microplastic-detector
   ```

2. Activate the virtual environment:
   ```bash
   source microplastics-env/bin/activate
   ```

3. Install required packages:
   ```bash
   pip install opencv-python numpy matplotlib pytest
   ```

### Setup Instructions for Raspberry Pi

0. Setup Raspberry Pi and install the camera:
   ```bash
   ssh admin@microplastics.local
   sudo raspi-config
   ```

   Go to:

   >   Interface Options → Camera → Enable

   Reboot:
   ```bash
   sudo reboot
   ```

1. Update `apt` and install dependencies `venv` and `opencv`:
   ```bash
   sudo apt update
   sudo apt install python3-venv python3-opencv -y
   ```

2. Set up project file and environment:
   ```bash
   cd ~
   mkdir mp-proj
   cd ~/mp-proj
   python3 -m venv --system-site-packages ~/mp-proj/mp-env
   python3 -m venv mp-env
   ```

3. Transfer files to the Raspberry Pi:
   ```bash
   scp -r software admin@microplastics-ui.local:~/mp-proj/
   ```

4. Activate the virtual environment and install the required packages:
   ```bash
   cd ~/mp-proj
   source mp-env/bin/activate
   pip install -r software/requirements.txt
   ```

5. Run the python script
   ```bash
   python -m software.main
   ```

## Usage

To analyze a single image:

```python
from software.analyze_microplastics import analyze_microplastics

# Basic usage
count, category = analyze_microplastics("path/to/your/image.jpg")

# Advanced usage with all parameters
count, category = analyze_microplastics(
    image_path="path/to/your/image.jpg",
    min_area=10,          # Minimum particle size in pixels
    max_area=5000,        # Maximum particle size in pixels
    low_thresh=10,        # Threshold for "Low" category
    high_thresh=30,       # Threshold for "Medium" category
    show_plot=True        # Whether to display visualization
)

print(f"Detected particles: {count}")
print(f"Concentration category: {category}")
```

### Parameters

- `image_path`: Path to the fluorescence image
- `min_area`: Minimum particle area to count (default: 10 pixels)
- `max_area`: Maximum particle area to count (default: 5000 pixels)
- `low_thresh`: Maximum particle count for "Low" classification (default: 10)
- `high_thresh`: Maximum particle count for "Medium" classification (default: 30)
- `show_plot`: Whether to display visualization plots (default: True)

### Return Values

Returns a tuple containing:
1. `count` (int): Number of detected particles
2. `category` (str): Concentration category ("Low", "Medium", or "High")

## Testing

The project includes comprehensive test suites for all components. To run the tests:

1. Ensure you're in the virtual environment:
   ```bash
   source microplastics-env/bin/activate
   ```

2. Run all tests:
   ```bash
   pytest tests/ -v
   ```

3. Run specific test files:
   ```bash
   pytest tests/test_analyze_microplastics.py -v  # Analysis tests
   pytest tests/test_capture_image.py -v          # Image capture tests
   pytest tests/test_main.py -v                   # Main pipeline tests
   ```

Additional test options:
- Use `-v` for verbose output
- Run specific tests: `pytest tests/test_capture_image.py -k "failure"`
- Show print statements: `pytest tests/ -s`

## Test Coverage

The test suite covers:

### Analysis Module
- Basic functionality and return types
- Threshold handling
- Area filtering
- Edge cases (zero/negative values)
- Input validation
- File handling
- Result consistency

### Image Capture Module
- Directory creation
- File naming conventions
- Error handling
- Hardware failure scenarios

### Main Pipeline
- Integration tests
- End-to-end workflow
- Error propagation

## Contributing

1. Create a fork
2. Create your feature branch
3. Make your changes
4. Run the test suite to ensure everything works
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
