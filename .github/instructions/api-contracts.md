---
description: Critical API contracts and function signatures that must not be broken
applyTo: "**"
---

# API Contracts

Purpose: Document critical function signatures and behaviors that must be preserved to maintain system integrity.

## ⚠️ DO NOT BREAK THESE CONTRACTS

### `software/analyze_microplastics.py`

**Function Signature:**
```python
analyze_microplastics(image_path, min_area=10, max_area=5000, low_thresh=10, high_thresh=30, show_image_processing=False) -> (int, str)
```

**Input Validations:**
- `min_area <= max_area` else raise `ValueError`
- Clamp negative values to ≥ 0
- Enforce `high_thresh >= low_thresh`

**Error Handling:**
- Missing file → `FileNotFoundError`
- Unreadable image → `ValueError`

**Processing Pipeline (Fixed Order):**
1. BGR → HSV color space conversion
2. Color masks for: `deep_red`, `red`, `orange`, `yellow`
3. Gaussian blur (3×3 kernel)
4. Bilateral filter
5. Otsu thresholding
6. Morphological opening (3×3 ellipse kernel)
7. Contour detection

**Counting Rules:**
- Include contours where: `min_area < contour_area < max_area`

**Classification Rules:**
- `count < low_thresh` → `"Low"`
- `count < high_thresh` → `"Medium"`
- `count >= high_thresh` → `"High"`

**Visualization:**
- Show processing steps only when `show_image_processing=True`
- Tests must set matplotlib backend to `'Agg'`

### `software/capture_image.py`

**Core Behavior:**
- Build `libcamera-still` command with optional camera controls
- Support parameters: shutter, gain, iso, metering, roi, awb, awbgains
- Ensure output directory exists
- Return absolute path to captured image
- Raise `RuntimeError` on nonzero exit code

**File Naming Contract:**
- Must use pattern: `captures/sample_*.jpg`
- Timestamp format: `YYYYMMDD_HHMMSS`

### `software/illuminate_sample.py`

**Hardware Interface:**
- Use `gpiozero.LED` for GPIO pins: 23, 24, 27
- `cleanup()` function must close all LED objects
- LED objects created on module import

**Error Handling:**
- Must handle GPIO cleanup gracefully
- Ensure LEDs are turned off on exit

### `software/main.py`

**Critical Requirement:**
- `run_capture_and_analysis()` must ALWAYS turn off LEDs in `finally` block
- LED cleanup must occur even if analysis fails
- No exceptions should prevent LED cleanup

## Return Value Contracts

### `analyze_microplastics()`
```python
return (particle_count: int, risk_level: str)
# where risk_level in ["Low", "Medium", "High"]
```

### `capture_image()`
```python
return image_path: str
# Absolute path to captured image file
```

## Testing Contracts

- Mock `subprocess.run` in capture tests
- `test_main` must patch both `capture_image` and `analyze_microplastics`
- Preserve default parameter values in tests
- HSV color ranges are part of the contract and covered by tests
