import argparse
import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

def analyze_microplastics(image_path, min_area=10, max_area=5000, low_thresh=10, high_thresh=30, show_image_processing=False):
    """
    Analyze a fluorescence image for microplastic particles.

    Args:
        image_path (str): Path to the captured image file.
        min_area (int): Minimum contour area to count (in pixels).
        max_area (int): Maximum contour area to count.
        low_thresh (int): Max count for 'Low' classification.
        high_thresh (int): Max count for 'Medium' classification.
        show_image_processing (bool): Whether to display the visualization plot.

    Returns:
        particle_count (int): Number of detected particles.
        category (str): 'Low', 'Medium', or 'High'

    Raises:
        ValueError: If min_area > max_area or if thresholds are invalid
        FileNotFoundError: If the image file doesn't exist
    """
    # Input validation
    if min_area > max_area:
        raise ValueError("min_area cannot be greater than max_area")
    
    # Ensure non-negative areas
    min_area = max(0, min_area)
    max_area = max(0, max_area)
    
    # Ensure thresholds are non-negative and properly ordered
    low_thresh = max(0, low_thresh)
    high_thresh = max(low_thresh, high_thresh)

    # Check if file exists
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")

    # Load image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Failed to load image: {image_path}")

    print("Processing image for microplastics...")

    # Convert to HSV (Hue, Saturation, Value) color space
    # It separates color information (hue) from intensity (value), making it easier to isolate specific colors.
    # This allows us to create masks based on specific color ranges.
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    ''' Define solvatochromic hue ranges '''
    # These ranges are based on the expected fluorescence emission of solvatochromic dyes like Nile Red.
    # The ranges are defined in HSV color space of (lower_bound, upper_bound), where:
    #   H: Hue of 0-179 (color type)
    #   S: Saturation of 0-255 (color intensity)
    #   V: Value of 0-255 (brightness)
    # 50 is a common threshold for Saturation and Value to ensure we are detecting bright colors.
    # Values in experiment:
    #   Excitation source: LED GREEN DIFFUSED 3MM ROUND T/H with peak @ 515 nm
    #   Emission filter Lee No. 105 Orange: 560 nm long-pass filter
    #   Nile Red:       Ex: 510-550 nm; Em: 580-650 nm
    #       Datasheet:  Ex: 515 nm;     Em: 585 nm
    #       🇯🇵 study:   Ex: 450–490 nm; Em: 515–565 nm
    #   Hydrophobic (non-polar) plastics, e.g. polyethylene (PE) & polypropylene (PP):  Em: 580-630 nm
    #   Hydrophilic (polar) plastics, e.g. polystyrene (PS):                            Em: 631+ nm
    color_ranges = {
        "deep_red": [(340, 50, 50), (359, 255, 255)],   # (700, 661) nm
        "red":      [(0, 50, 50), (22, 255, 255)],      # (660, 626) nm
        "orange":   [(23, 50, 50), (51, 255, 255)],     # (625, 591) nm
        "yellow":   [(52, 50, 50), (70, 255, 255)],     # (590, 566) nm
        # "green":    [(71, 50, 50), (153, 255, 255)]      # (565, 500) nm
        # "blue":     [(154, 50, 50), (179, 255, 255)]     # (500, 450) nm
    }

    # Create masks for each color range
    # cv2.inRange(src, lowerb, upperb) creates a binary mask where pixels within the specified range are set to 255 (white),
    # and pixels outside the range are set to 0 (black).
    # The masks are combined to create a full mask that highlights all the relevant colors.
    full_mask = np.zeros_like(hsv[:, :, 0])
    masks = {}

    # Iterate through each color range and create a mask
    for name, (lower, upper) in color_ranges.items():
        # Convert lower and upper bounds to numpy arrays for cv2.inRange
        lower = np.array(lower)
        upper = np.array(upper)
        mask = cv2.inRange(hsv, lower, upper)
        masks[name] = mask
        full_mask = cv2.bitwise_or(full_mask, mask)
    
    # Deep red + red masks
    red_deep_red_mask = cv2.bitwise_or(masks["deep_red"], masks["red"])

    # Orange mask
    yellow_orange_mask = cv2.bitwise_or(masks["orange"], masks["yellow"])

    ''' Blur to reduce noise '''
    # Fluorescence images often have speckle noise or small bright pixels not related to microplastics.
    # Blurring helps smooth out these high-frequency artifacts before thresholding.
    # Sharp edges or pixel spikes can confuse the thresholding process.
    # Threshold algorithms (like Otsu’s method) work better when the image is smoothed.
    # It helps ensure that true signals (plastics) stand out from background variations.
    # cv2.GaussianBlur(src, ksize, sigmaX) applies a Gaussian blur to the image.
    #   src: source image
    #   ksize: size of the Gaussian kernel
    #       An odd integer tuple, e.g., (5, 5).
    #       Determines the extent of blurring; larger values result in more blur.
    #       A kernel size of (5, 5) is a common choice for moderate blurring.
    #   sigmaX: standard deviation in the X direction (0 means it is calculated based on ksize)
    blurred = cv2.GaussianBlur(full_mask, (3, 3), 0)

    ''' Bilateral filter to preserve edges '''
    # The bilateral filter smooths the image while preserving edges, making it useful for fluorescence images.
    # cv2.bilateralFilter(src, d, sigmaColor, sigmaSpace) applies a bilateral filter to the image.
    #   src: source image
    #   d: diameter of the pixel neighborhood used during filtering (must be odd)
    #   sigmaColor: filter sigma in color space (larger values mean more colors will be mixed)
    #   sigmaSpace: filter sigma in coordinate space (larger values mean farther pixels will influence each other)
    bilateral_filtered = cv2.bilateralFilter(full_mask, d=3, sigmaColor=75, sigmaSpace=75)

    ''' Threshold (Otsu’s method) '''
    # Otsu's method automatically determines a threshold value to separate foreground from background.
    # It is particularly useful for images with bimodal histograms, like fluorescence images.
    # cv2.threshold(src, thresh_value, max_value, method)
    # thresh_value: initial threshold — set to 0 to enable Otsu’s auto-calculation
    # method
    #   THRESH_BINARY: pixels > threshold → 255 (white); others → 0 (black)
    #   THRESH_OTSU: automatically calculates the optimal threshold to separate foreground from background based on image histogram
    _, binary = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    ''' Morphological cleanup '''
    # Morphological operations help remove small noise and enhance the structure of detected particles.
    # cv2.getStructuringElement(shape, ksize) creates a structuring element for morphological operations.
    #   shape: cv2.MORPH_ELLIPSE, which creates an elliptical structuring element, which is effective for circular particles.
    #   ksize: size of the structuring element (3x3 in this case)
    # cv2.morphologyEx(src, op, kernel) applies a morphological operation to the image.
    #   src: source image (binary mask)
    #   op: morphological operation to apply
    #       cv2.MORPH_OPEN: removes small objects from the foreground (noise) while preserving larger structures.
    #   kernel: structuring element created above
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

    ''' Find contours '''
    # cv2.findContours(image, mode, method) detects contours in a binary image.
    #   mode: cv2.RETR_EXTERNAL retrieves only the outer contours (useful for counting particles)
    #   method: cv2.CHAIN_APPROX_SIMPLE compresses horizontal, vertical, and diagonal segments and leaves only their endpoints.
    #       This reduces memory usage and speeds up contour processing.
    # The contours are stored in a list, where each contour is represented as an array of points.
    # The second return value is the hierarchy of contours, which we don't need here.
    contours, _ = cv2.findContours(cleaned, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Count valid particles
    count = 0
    for shape in contours:
        area = cv2.contourArea(shape)
        if min_area < area < max_area:
            count += 1

    category = "Low" if count < low_thresh else "Medium" if count < high_thresh else "High"


    ''' Visualize only if show_image_processing is True '''
    if show_image_processing:
        ''' Draw contours on the cleaned image '''
        # This step visualizes the detected contours on the cleaned image.
        # cv2.drawContours(image, contours, contourIdx, color, thickness)
        #   image: the image on which to draw the contours
        #   contours: list of contours to draw
        #   contourIdx: -1 means draw all contours; you can specify an index to draw a specific contour
        #   color: color of the contours (green in this case)
        #   thickness: thickness of the contour lines in pixels
        contour_img = image.copy()
        cv2.drawContours(contour_img, contours, -1, (0, 255, 0), 1)

        # Create a 2x4 grid of subplots
        fig, axes = plt.subplots(2, 4, figsize=(16, 10))
        axes[0, 0].imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        axes[0, 0].set_title("Original image")
        axes[0, 0].axis('off')

        axes[0, 1].imshow(red_deep_red_mask, cmap='gray')
        axes[0, 1].set_title("Red/deep red channels")
        axes[0, 1].axis('off')

        axes[0, 2].imshow(yellow_orange_mask, cmap='gray')
        axes[0, 2].set_title("Yellow/orange channels")
        axes[0, 2].axis('off')

        axes[0, 3].imshow(full_mask, cmap='gray')
        axes[0, 3].set_title("Combined mask")
        axes[0, 3].axis('off')

        axes[1, 0].imshow(blurred, cmap='gray')
        axes[1, 0].set_title("Blurred image")
        axes[1, 0].axis('off')

        axes[1, 1].imshow(bilateral_filtered, cmap='gray')
        axes[1, 1].set_title("Bilateral filter")
        axes[1, 1].axis('off')

        axes[1, 2].imshow(cleaned, cmap='gray')
        axes[1, 2].set_title("Cleaned image")
        axes[1, 2].axis('off')

        axes[1, 3].imshow(cv2.cvtColor(contour_img, cv2.COLOR_BGR2RGB))
        axes[1, 3].set_title("Contours detected")
        axes[1, 3].axis('off')

        plt.suptitle(f"Detected particles: {count} → Category: {category}", fontsize=14)
        plt.tight_layout()
        plt.show()

    return count, category

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze a captured image for microplastics")
    parser.add_argument(
        "--show_image_processing",
        action="store_true",
        help="Show image processing steps in a plot"
    )
    parser.add_argument(
        "--image_path",
        type=str,
        default="./tests/test-images/test_image_1.jpg",
        help="Path to the input image"
    )
    args = parser.parse_args()

    count, level = analyze_microplastics(args.image_path, show_image_processing=args.show_image_processing)
    print(f"Detected particles: {count} → Category: {level}")