import cv2
import numpy as np
import matplotlib.pyplot as plt

def analyze_microplastics(image_path, min_area=10, max_area=5000, low_thresh=10, high_thresh=30):
    """
    Analyze a fluorescence image for microplastic particles.

    Args:
        image_path (str): Path to the captured image file.
        min_area (int): Minimum contour area to count (in pixels).
        max_area (int): Maximum contour area to count.
        low_thresh (int): Max count for 'Low' classification.
        high_thresh (int): Max count for 'Medium' classification.

    Returns:
        particle_count (int): Number of detected particles.
        category (str): 'Low', 'Medium', or 'High'
    """
    # Load image
    image = cv2.imread(image_path)
    
    print("Processing image for solvatochromic microplastics...")

    # Convert to HSV (Hue, Saturation, Value) color space
    # It separates color information (hue) from intensity (value), making it easier to isolate specific colors.
    # This allows us to create masks based on specific color ranges.
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define solvatochromic hue ranges
    # These ranges are based on the expected fluorescence emission of solvatochromic dyes like Nile Red.
    # The ranges are defined in HSV color space, where:
    #   H: Hue (color type)
    #   S: Saturation (color intensity)
    #   V: Value (brightness)
    # The ranges are defined as tuples of (lower_bound, upper_bound) for each color.
    color_ranges = {
        "red":    [(0, 50, 50), (10, 255, 255)],
        "orange": [(11, 50, 50), (25, 255, 255)],
        "yellow": [(26, 50, 50), (35, 255, 255)],
        "green":  [(36, 50, 50), (85, 255, 255)]
    }

    # Create masks for each color range
    # cv2.inRange(src, lowerb, upperb) creates a binary mask where pixels within the specified range are set to 255 (white),
    # and pixels outside the range are set to 0 (black).
    # The masks are combined to create a final mask that highlights all the relevant colors.
    final_mask = np.zeros_like(hsv[:, :, 0])
    masks = {}

    for name, (lower, upper) in color_ranges.items():
        lower = np.array(lower)
        upper = np.array(upper)
        mask = cv2.inRange(hsv, lower, upper)
        masks[name] = mask
        final_mask = cv2.bitwise_or(final_mask, mask)

    # Red + Orange mask
    red_orange_mask = cv2.bitwise_or(masks["red"], masks["orange"])

    # Blur to reduce noise.
    # Fluorescence images often have speckle noise or small bright pixels not related to microplastics.
    # Blurring helps smooth out these high-frequency artifacts before thresholding.
    # Sharp edges or pixel spikes can confuse the thresholding process.
    # Threshold algorithms (like Otsu’s method) work better when the image is smoothed.
    # It helps ensure that true signals (plastics) stand out from background variations.
    blurred = cv2.GaussianBlur(final_mask, (5, 5), 0)

    # Threshold (Otsu’s method)
    # Otsu's method automatically determines a threshold value to separate foreground from background.
    # It is particularly useful for images with bimodal histograms, like fluorescence images.
    # cv2.threshold(src, thresh_value, max_value, method)
    # thresh_value: initial threshold — set to 0 to enable Otsu’s auto-calculation
    # method
    #   THRESH_BINARY: pixels > threshold → 255 (white); others → 0 (black)
    #   THRESH_OTSU: automatically calculates the optimal threshold to separate foreground from background based on image histogram
    _, binary = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Morphological cleanup
    # Morphological operations help remove small noise and enhance the structure of detected particles.
    # cv2.getStructuringElement(shape, ksize) creates a structuring element for morphological operations.
    #   shape: cv2.MORPH_ELLIPSE, which creates an elliptical structuring element, which is effective for circular particles.
    #   ksize: size of the structuring element (3x3 in this case)
    # cv2.MORPH_OPEN: removes small objects from the foreground (noise) while preserving larger structures.
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

    # Find contours
    # cv2.findContours(image, mode, method) detects contours in a binary image.
    #   mode: cv2.RETR_EXTERNAL retrieves only the outer contours (useful for counting particles)
    #   method: cv2.CHAIN_APPROX_SIMPLE compresses horizontal, vertical, and diagonal segments and leaves only their endpoints.
    #       This reduces memory usage and speeds up contour processing.
    # The contours are stored in a list, where each contour is represented as an array of points.
    # The second return value is the hierarchy of contours, which we don't need here.
    contours, _ = cv2.findContours(cleaned, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Count valid particles
    count = 0
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if min_area < area < max_area:
            count += 1

    category = "Low" if count < low_thresh else "Medium" if count < high_thresh else "High"

    # Draw contours on the cleaned image
    # This step visualizes the detected contours on the cleaned image.
    # cv2.drawContours(image, contours, contourIdx, color, thickness)
    #   image: the image on which to draw the contours
    #   contours: list of contours to draw
    #   contourIdx: -1 means draw all contours; you can specify an index to draw a specific contour
    #   color: color of the contours (green in this case)
    #   thickness: thickness of the contour lines in pixels
    contour_img = image.copy()
    cv2.drawContours(contour_img, contours, -1, (0, 255, 0), 1)

    # Visualize
    fig, axes = plt.subplots(2, 3, figsize=(16, 10))
    axes[0, 0].imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    axes[0, 0].set_title("Original image")
    axes[0, 0].axis('off')

    axes[0, 1].imshow(red_orange_mask, cmap='gray')
    axes[0, 1].set_title("Red + orange channels")
    axes[0, 1].axis('off')

    axes[0, 2].imshow(final_mask, cmap='gray')
    axes[0, 2].set_title("All hue channel ranges")
    axes[0, 2].axis('off')

    axes[1, 0].imshow(blurred, cmap='gray')
    axes[1, 0].set_title("Blurred image")
    axes[1, 0].axis('off')

    axes[1, 1].imshow(cleaned, cmap='gray')
    axes[1, 1].set_title("Cleaned image")
    axes[1, 1].axis('off')

    axes[1, 2].imshow(cv2.cvtColor(contour_img, cv2.COLOR_BGR2RGB))
    axes[1, 2].set_title("Contours detected")
    axes[1, 2].axis('off')

    plt.suptitle(f"Detected particles: {count} → Category: {category}", fontsize=14)
    plt.tight_layout()
    plt.show()

    return count, category

if __name__ == "__main__":
    # Example usage
    image_file = "./test-images/test_image_9.jpg"
    count, level = analyze_microplastics(image_file)
    print(f"Detected particles: {count} → Category: {level}")