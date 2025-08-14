import os
import subprocess
from datetime import datetime

def capture_image(
    output_dir: str = "captures",
    timeout_ms: int = 1000,
    shutter_us: int | None = None,
    gain: float | None = None,
    iso: int | None = None,
    metering: str | None = None,
    roi: str | None = None,
    awb: str | None = None,
    awbgains: str | None = None,
):
    """
    Capture an image using libcamera-still with optional manual controls.

    Args:
        output_dir: Directory to save the image.
        timeout_ms: Capture timeout in milliseconds (exposure budget for auto, or delay for still).
        shutter_us: Manual exposure time in microseconds (disables AE when set).
        gain: Manual analogue gain (e.g., 1.0–16.0, disables AGC when set).
        iso: Desired ISO (alternative to gain; libcamera maps to gain if supported).
        metering: Metering mode (e.g., "centre", "spot", "average", "matrix").
        roi: Region of interest for AE/AWB as "x,y,w,h" (normalized 0–1).
        awb: Auto white balance mode (e.g., "auto", "tungsten", "fluorescent", "daylight", "cloudy").
        awbgains: Manual AWB gains as "red,blue" (disables AWB when set).

    Returns:
        str: Path to the saved image.

    Raises:
        RuntimeError: If image capture fails.
    """
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    image_path = f"{output_dir}/sample_{timestamp}.jpg"
    
    # Build libcamera-still command
    cmd = [
        "libcamera-still",
        "-o", image_path,
        "--nopreview",
        "--timeout", str(timeout_ms),
    ]

    # Manual exposure controls
    if shutter_us is not None:
        cmd += ["--shutter", str(shutter_us)]
    if gain is not None:
        cmd += ["--gain", str(gain)]
    if iso is not None:
        cmd += ["--iso", str(iso)]

    # Metering / ROI / AWB controls
    if metering:
        cmd += ["--metering", metering]
    if roi:
        # ROI is normalized floats: "x,y,w,h" in [0,1]
        cmd += ["--roi", roi]
    if awb:
        cmd += ["--awb", awb]
    if awbgains:
        cmd += ["--awbgains", awbgains]

    print(f"Capturing image to {image_path}...")
    result = subprocess.run(cmd)
    
    if result.returncode != 0:
        raise RuntimeError("Image capture failed. Check camera connection and permissions.")
    
    return image_path

if __name__ == "__main__":
    image_path = capture_image()
    print(f"Image captured successfully: {image_path}")