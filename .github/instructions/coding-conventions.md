---
description: Coding conventions, patterns, and organizational standards
applyTo: "**"
---

# Coding Conventions

Purpose: Maintain consistent code style and organizational patterns throughout the project.

## File Organization

### Output Files
- Keep all capture outputs under `captures/` directory
- Use `sample_` prefix with timestamp: `sample_YYYYMMDD_HHMMSS.jpg`
- Ensure timestamp format consistency across modules

### Module Structure
- Core functionality in `software/` package
- Keep modules focused and single-purpose
- Use clear, descriptive module names

## Code Patterns

### Side Effects
- **Avoid side effects** outside of `run_capture_and_analysis()`
- Functions should be pure when possible
- Minimize global state modifications

### Visualization
- **Avoid showing plots by default** in analysis functions
- Use explicit `show_image_processing` parameter for visualization
- Set matplotlib backend appropriately for testing environment

### Error Handling
- Always ensure LED cleanup in error paths
- Use appropriate exception types (`FileNotFoundError`, `ValueError`, `RuntimeError`)
- Provide meaningful error messages

## Configuration Management

### Default Parameters
- **Preserve threshold defaults** - they are part of the tested contract
- HSV color ranges are validated by tests - don't modify arbitrarily
- Area thresholds (`min_area=10`, `max_area=5000`) are empirically determined

### Hardware Configuration
- GPIO pin assignments (23, 24, 27) are fixed in hardware design
- Camera parameters should remain configurable through function arguments
- LED cleanup must be robust and always executed

## Import Patterns

### Module Imports
```python
# Prefer absolute imports within package
from software.analyze_microplastics import analyze_microplastics
from software.capture_image import capture_image
from software.illuminate_sample import illuminate_sample, cleanup
```

### External Dependencies
- Use `gpiozero` for GPIO control (Raspberry Pi)
- Prefer `opencv-python` for development, `python3-opencv` for Pi
- Import hardware-specific modules conditionally when possible

## Testing Patterns

### Mocking
- Mock `subprocess.run` for camera operations in tests
- Patch hardware-dependent functions in integration tests
- Use `@patch` decorators consistently

### Test Data
- Store test images in `tests/test-images/`
- Use descriptive test image names
- Include variety of particle counts and types

### Assertions
- Test both positive and negative cases
- Validate error conditions and edge cases
- Check return value types and formats

## Documentation Patterns

### Function Documentation
- Document parameter validation rules
- Specify return value formats
- Note side effects (LED control, file creation)
- Include usage examples for complex functions

### Code Comments
- Explain algorithm steps in analysis pipeline
- Document hardware-specific requirements
- Note contract requirements and constraints

## Performance Considerations

### Image Processing
- Use efficient OpenCV operations
- Minimize memory allocations in loops
- Consider image size impacts on processing time

### File I/O
- Ensure directory existence before file operations
- Use absolute paths to avoid confusion
- Clean up temporary files when appropriate
