---
description: Development commands, testing procedures, and workflow guidance
applyTo: "**"
---

# Development Workflows

Purpose: Standard commands and procedures for developing and testing the microplastic detector.

## Local Development

### Analyzer-Only Testing
Run the analysis module on test images without hardware:

```bash
python -m software.analyze_microplastics --image_path tests/test-images/test_image_1.jpg
```

This is useful for:
- Algorithm development
- Testing on non-Raspberry Pi systems
- Validating analysis parameters

### Full Pipeline (Raspberry Pi)
Run the complete capture and analysis workflow:

```bash
python -m software.main
```

Requirements:
- Raspberry Pi with camera module
- LEDs wired to GPIO pins 23, 24, 27
- `libcamera-still` available

## Testing

### Run All Tests
```bash
pytest tests/ -v
```

### Run Specific Test Modules
```bash
# Test analysis module
pytest tests/test_analyze_microplastics.py -v

# Test image capture
pytest tests/test_capture_image.py -v

# Test main workflow
pytest tests/test_main.py -v
```

### Test Environment Notes
- Tests mock `subprocess.run` for capture functionality
- `test_main` patches both `capture_image` and `analyze_microplastics`
- Matplotlib backend set to `'Agg'` for headless testing
- Test images available in `tests/test-images/`

## Frontend Development

### React App (`app/`)
```bash
# Navigate to app directory
cd app/

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note**: Frontend is currently standalone and not connected to Python backend.

## Environment Setup

### Python Environment
```bash
# Create virtual environment
python -m venv microplastics-env

# Activate (macOS/Linux)
source microplastics-env/bin/activate

# Activate (Windows)
microplastics-env\Scripts\activate

# Install dependencies
pip install -r software/requirements.txt
```

### Platform-Specific Dependencies
- **Raspberry Pi**: `apt install python3-opencv libcamera-tools`
- **Development**: `pip install opencv-python pytest`

## Debug Workflows

### Capture Issues
1. Check camera connection: `libcamera-hello`
2. Test manual capture: `libcamera-still -o test.jpg`
3. Verify GPIO wiring for LEDs

### Analysis Issues
1. Use `show_image_processing=True` to visualize pipeline
2. Check HSV color ranges with test images
3. Adjust area thresholds for different particle sizes

### Integration Issues
1. Verify file paths in `captures/` directory
2. Check LED cleanup in error conditions
3. Monitor GPIO state during debugging
