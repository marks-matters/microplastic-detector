---
description: High-level architecture and workflow overview for the microplastic detector
applyTo: "**"
---

# Architecture Overview

Purpose: Understand the big picture architecture and core workflow of the microplastic detector system.

## System Architecture

The microplastic detector consists of two main components:

### 1. Hardware-Enabled Python Pipeline (`software/`)
- **Purpose**: Complete capture → analysis → report workflow
- **Platform**: Raspberry Pi with camera and LED hardware
- **Components**:
  - Image capture using `libcamera-still`
  - LED illumination control via GPIO
  - OpenCV-based microplastic analysis
  - Result reporting and storage

### 2. Optional React Frontend (`app/`)
- **Purpose**: Standalone UI for visualization and interaction
- **Platform**: Web-based (Vite + React + TypeScript)
- **Status**: Not currently wired to Python backend
- **Use Case**: Development, demonstration, future web interface

## Core Workflow

The main pipeline (`software/main.py`) follows this sequence:

```
1. illuminate_sample(lights=True)     # Turn on LEDs (GPIO 23/24/27)
2. capture_image()                    # Run libcamera-still → captures/sample_YYYYMMDD_HHMMSS.jpg
3. analyze_microplastics(path)        # OpenCV HSV masks + morphology → count + risk level
4. finally: illuminate_sample(lights=False) + cleanup()  # Always turn off LEDs
```

### Analysis Pipeline Details

The `analyze_microplastics()` function implements:
1. **Color Space Conversion**: BGR → HSV
2. **Color Filtering**: Masks for deep_red, red, orange, yellow
3. **Image Processing**: Gaussian blur → bilateral filter → Otsu thresholding
4. **Morphological Operations**: Opening with 3×3 ellipse kernel
5. **Contour Detection**: Find and count particles
6. **Classification**: Count → Low/Medium/High risk categories

## Data Flow

```
Hardware Input → Image Capture → Analysis → Results
     ↓              ↓             ↓         ↓
LED + Camera → .jpg files → OpenCV → Count + Risk Level
```

## File Organization

- **`software/`**: Core Python modules
- **`captures/`**: Timestamped sample images
- **`tests/`**: Unit tests and test images
- **`app/`**: React frontend (standalone)
- **`hardware/`**: 3D models and hardware specs
