---
description: Repo-specific guidance for AI agents working on the microplastic detector
applyTo: "**"
---

# Microplastic Detector – AI instructions

Purpose: Make AI coding agents productive in this repo by capturing the architecture, workflows, and gotchas that matter.

## Big picture
- Two parts:
  - Hardware-enabled Python pipeline in `software/` for capture → analysis → report.
  - Optional React + Vite app in `app/` (standalone UI, not wired to Python).
- Flow (`software/main.py`):
  1) `illuminate_sample(lights=True)` turns on LEDs (GPIO 23/24/27).
  2) `capture_image()` runs `libcamera-still` → `captures/sample_YYYYMMDD_HHMMSS.jpg`.
  3) `analyze_microplastics(path)` (OpenCV HSV masks + morphology) → count + Low/Medium/High.
  4) `finally`: `illuminate_sample(lights=False)` and `cleanup()`.

## Contracts (don’t break these)
- `software/analyze_microplastics.py`
  - Signature: `analyze_microplastics(image_path, min_area=10, max_area=5000, low_thresh=10, high_thresh=30, show_image_processing=False) -> (int, str)`.
  - Validations: `min_area <= max_area` else `ValueError`; clamp negatives to ≥ 0; enforce `high_thresh >= low_thresh`.
  - IO: missing file → `FileNotFoundError`; unreadable → `ValueError`.
  - Pipeline: BGR→HSV; masks for `deep_red|red|orange|yellow`; Gaussian blur 3×3 → bilateral → Otsu → morph open (3×3 ellipse) → contours.
  - Count rule: `min_area < area < max_area`.
  - Category: `< low → Low`, `< high → Medium`, else `High`.
  - Viz only when `show_image_processing=True`; tests set matplotlib backend to `Agg`.
- `software/capture_image.py`
  - Builds `libcamera-still` with optional controls (shutter/gain/iso/metering/roi/awb/awbgains).
  - Ensures output dir; returns image path; nonzero exit → `RuntimeError`.
  - File naming must be `captures/sample_*.jpg`.
- `software/illuminate_sample.py`
  - `gpiozero.LED` pins 23/24/27; `cleanup()` closes LEDs; import creates LED objects.
- `software/main.py`
  - `run_capture_and_analysis()` must always turn off LEDs in `finally`.

## Dev workflows
- Local analyzer:
  ```bash
  python -m software.analyze_microplastics --image_path tests/test-images/test_image_1.jpg
  ```
- Raspberry Pi full pipeline:
  ```bash
  python -m software.main
  ```
- Tests (pytest):
  ```bash
  pytest tests/ -v
  pytest tests/test_analyze_microplastics.py -v
  ```
  Notes: tests mock `subprocess.run` in capture; `test_main` patches `capture_image` and `analyze_microplastics`.

## Conventions and patterns
- Keep capture outputs under `captures/` with `sample_` timestamp prefix.
- Don’t introduce side effects outside `run_capture_and_analysis()`; avoid showing plots by default.
- Threshold defaults and HSV ranges are part of the contract and covered by tests—preserve them.

## Integration and environment
- `libcamera-still` is required on the Pi; on non-Pi, run analyzer-only or mock subprocess.
- `gpiozero` expects GPIO 23/24/27 wired; ensure LEDs are turned off in error paths.
- OpenCV: on Pi prefer `apt install python3-opencv`; locally use `opencv-python`.

## Frontend (`app/`)
- Vite + React + TS; scripts: `npm run dev|build|preview`. No backend coupling in this repo.

## Documentation synchronization
When making changes to core functionality, always update documentation:

### Files to keep synchronized:
- **README.md**: User-facing documentation with current API signatures, setup instructions, and examples
- **.github/instructions/microplastic-detector.instructions.md**: This file - AI guidance with contracts and workflows
- **.cursor/rules/**: Documentation standards and automated update triggers (multiple rule files)

### Update triggers:
- **Function signature changes** in `software/analyze_microplastics.py`, `capture_image.py`, or `main.py` → Update README examples and AI contracts
- **New dependencies** in `requirements.txt` or `package.json` → Update setup instructions in README
- **New features or modules** → Document in README usage section and update AI workflows
- **Directory structure changes** → Update both README structure listing and AI file pointers
- **Test structure changes** → Update testing documentation in README

### Synchronization checklist:
1. Function signature changes: Update README code examples and AI contracts section
2. New parameters or return values: Update README parameter tables and AI validations
3. New dependencies: Update README setup instructions
4. Workflow changes: Update AI dev workflows section
5. File moves/renames: Update AI pointers section and README structure

## Pointers
- Core: `software/` and `tests/`
- Deps: `software/requirements.txt`
- Images: `tests/test-images/`
- Docs: `README.md`
