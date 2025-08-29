---
description: Quick reference to key files and directories in the project
applyTo: "**"
---

# File Pointers

Purpose: Quick reference guide to important files and directories for efficient navigation.

## Core Python Modules

### Main Pipeline
- **`software/main.py`**: Entry point for complete capture and analysis workflow
- **`software/analyze_microplastics.py`**: Core analysis algorithm with OpenCV processing
- **`software/capture_image.py`**: Camera control and image capture functionality
- **`software/illuminate_sample.py`**: LED control for sample illumination

### Supporting Files
- **`software/__init__.py`**: Package initialization
- **`software/requirements.txt`**: Python dependencies

## Testing Infrastructure

### Test Modules
- **`tests/test_analyze_microplastics.py`**: Analysis algorithm tests
- **`tests/test_capture_image.py`**: Image capture tests
- **`tests/test_main.py`**: Integration tests for main workflow

### Test Data
- **`tests/test-images/`**: Sample images for testing analysis
  - `test_image_1.jpg` through `test_image_7.jpg`
  - Real sample images from various dates

## Data and Output

### Image Storage
- **`captures/`**: Runtime image capture directory
  - Naming pattern: `sample_YYYYMMDD_HHMMSS.jpg`
  - Automatically created by capture module

### Configuration
- **`microplastics-env/`**: Python virtual environment
- **`__pycache__/`**: Python bytecode cache (auto-generated)

## Frontend Application

### Core Files
- **`app/src/App.tsx`**: Main React component
- **`app/src/main.tsx`**: Application entry point
- **`app/package.json`**: Node.js dependencies and scripts
- **`app/vite.config.ts`**: Vite build configuration

### Configuration
- **`app/tailwind.config.js`**: Tailwind CSS configuration
- **`app/postcss.config.mjs`**: PostCSS configuration
- **`app/styles.css`**: Global stylesheets

### Components
- **`app/src/components/`**: React component library

## Documentation

### User Documentation
- **`README.md`**: Main project documentation
- **`protocols/microplastics-detection-protocol.md`**: Scientific methodology

### AI Instructions
- **`.github/instructions/`**: Modular AI guidance files
  - `architecture-overview.md`
  - `api-contracts.md`
  - `development-workflows.md`
  - `coding-conventions.md`
  - `environment-setup.md`
  - `frontend-guidelines.md`
  - `documentation-sync.md`

### Automation Rules
- **`.cursor/rules/`**: Documentation maintenance automation
  - `README.md`: Rules overview
  - Various `.mdc` files for specific triggers

## Hardware and Design

### 3D Models
- **`hardware/`**: CAD files and STL models
  - `core_body.scad/.stl`: Main housing components
  - `core_cover_v2.scad/.stl`: Cover designs
  - `core_leg_*.scad/.stl`: Support legs (various sizes)
  - `camera_extension.scad/.stl`: Camera mounting

### Assembly
- **`hardware/full housing.scad`**: Complete assembly model
- **`hardware/led angels and dispersion of light onto membrane.scad`**: Lighting analysis

## Project Configuration

### Version Control
- **`.git/`**: Git repository data
- **`LICENSE`**: Project license information

### Development Environment
- **`.cursor/`**: Cursor IDE configuration and rules
- **`.github/`**: GitHub-specific configurations and instructions

## Quick Access Patterns

### For Algorithm Development
```
software/analyze_microplastics.py    # Main algorithm
tests/test_analyze_microplastics.py  # Algorithm tests
tests/test-images/                   # Test data
```

### For Hardware Integration
```
software/main.py                     # Integration point
software/capture_image.py            # Camera interface
software/illuminate_sample.py        # LED control
```

### For Frontend Development
```
app/src/                            # React source code
app/package.json                    # Dependencies
app/guidelines/Guidelines.md        # Development guide
```

### For Documentation Updates
```
README.md                           # User documentation
.github/instructions/               # AI guidance
.cursor/rules/                      # Automation rules
```
