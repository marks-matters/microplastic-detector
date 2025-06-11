
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

## Usage

To analyze a single image:

```python
from analyze_microplastics import analyze_microplastics

# Analyze an image
count, category = analyze_microplastics("path/to/your/image.jpg")
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

## Testing

The project includes a comprehensive test suite. To run the tests:

1. Ensure you're in the virtual environment:
   ```bash
   source microplastics-env/bin/activate
   ```
2. Run the tests:
   ```bash
   pytest test_analyze_microplastics.py
   ```

Additional test options:
- Use `-v` for verbose output: `pytest test_analyze_microplastics.py -v`
- Run specific tests: `pytest test_analyze_microplastics.py -k "area"`
- Show print statements: `pytest test_analyze_microplastics.py -s`

## Test Coverage

The test suite covers:
- Basic functionality and return types
- Threshold handling
- Area filtering
- Edge cases (zero/negative values)
- Input validation
- File handling
- Result consistency

## Contributing

1. Create a fork
2. Create your feature branch
3. Make your changes
4. Run the test suite to ensure everything works
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
