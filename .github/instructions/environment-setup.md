---
description: Platform-specific setup, dependencies, and environment configuration
applyTo: "**"
---

# Environment Setup

Purpose: Guide setup and dependency management across different development and deployment environments.

## Platform Requirements

### Raspberry Pi (Production)
**Operating System:** Raspberry Pi OS (recommended)

**Hardware Dependencies:**
- Camera module (compatible with `libcamera`)
- LEDs wired to GPIO pins 23, 24, 27
- Appropriate resistors for LED current limiting

**System Packages:**
```bash
# Update system
sudo apt update && sudo apt upgrade

# Install camera tools
sudo apt install libcamera-tools

# Install OpenCV (prefer system package)
sudo apt install python3-opencv

# Install Python development tools
sudo apt install python3-pip python3-venv
```

**Camera Configuration:**
- Enable camera interface: `sudo raspi-config` → Interface Options → Camera
- Test camera: `libcamera-hello` (should show preview)
- Test capture: `libcamera-still -o test.jpg`

### Development Environment (macOS/Linux/Windows)

**Python Requirements:**
- Python 3.8+ recommended
- Virtual environment setup strongly recommended

**Installation:**
```bash
# Create and activate virtual environment
python -m venv microplastics-env
source microplastics-env/bin/activate  # macOS/Linux
# microplastics-env\Scripts\activate  # Windows

# Install dependencies
pip install -r software/requirements.txt
```

**Development-Only Packages:**
```bash
# Install OpenCV for development
pip install opencv-python

# Install testing tools
pip install pytest pytest-cov

# Install development tools
# pip install black flake8 mypy
```

## Dependency Management

### Core Dependencies (`software/requirements.txt`)
- `opencv-python` or system `python3-opencv`
- `gpiozero` (Raspberry Pi GPIO control)
- `numpy` (included with OpenCV)
- `matplotlib` (visualization, optional)

### Platform-Specific Handling

**Raspberry Pi:**
```python
# GPIO operations work normally
from gpiozero import LED
led = LED(23)
```

**Development Systems:**
```python
# Mock GPIO when not on Pi
try:
    from gpiozero import LED
except ImportError:
    # Provide mock or skip GPIO operations
    pass
```

### Camera Dependencies

**Raspberry Pi:**
- `libcamera-still` must be available in PATH
- Camera module must be enabled in `raspi-config`

**Development Systems:**
- Mock `subprocess.run` calls to `libcamera-still`
- Use existing test images for analysis development

## Environment Variables

### Optional Configuration
```bash
# Set custom capture directory
export MICROPLASTIC_CAPTURES_DIR="/custom/path/captures"

# Configure analysis parameters
export MICROPLASTIC_MIN_AREA="15"
export MICROPLASTIC_MAX_AREA="4000"
```

## Troubleshooting

### Common Raspberry Pi Issues

**Camera Not Detected:**
```bash
# Check camera connection
libcamera-hello

# Verify camera interface enabled
sudo raspi-config

# Check for hardware errors
dmesg | grep -i camera
```

**GPIO Permission Issues:**
```bash
# Add user to gpio group
sudo usermod -a -G gpio $USER

# Restart session or reboot
sudo reboot
```

**OpenCV Import Errors:**
```bash
# Remove pip opencv if system opencv installed
pip uninstall opencv-python

# Install system opencv
sudo apt install python3-opencv
```

### Development Environment Issues

**Virtual Environment:**
```bash
# Ensure virtual environment is activated
which python  # Should point to venv

# Reinstall requirements if needed
pip install -r software/requirements.txt --force-reinstall
```

**Import Errors:**
```bash
# Run from project root
cd /path/to/microplastic-detector
python -m software.analyze_microplastics --help
```

## Performance Optimization

### Raspberry Pi
- Use system OpenCV package (faster than pip version)
- Enable camera hardware acceleration if available
- Monitor memory usage during analysis

### Development
- Use smaller test images for faster iteration
- Enable matplotlib caching for repeated visualizations
- Consider image downsampling for algorithm development
