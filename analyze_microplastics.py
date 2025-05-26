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
    img = cv2.imread(image_path)

    print("Processing image for microplastics...")

    fig, axes = plt.subplots(2, 3, figsize=(16, 8))

    axes[0, 0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    axes[0, 0].set_title("Original image")
    axes[0, 0].axis('off')

    # Extract red channel (Nile Red emits in red)
    red = img[:, :, 2]

    axes[0, 1].imshow(red)
    axes[0, 1].set_title("Red channel")
    axes[0, 1].axis('off')

    # Blur to reduce noise.
    # Fluorescence images often have speckle noise or small bright pixels not related to microplastics.
    # Blurring helps smooth out these high-frequency artifacts before thresholding.
    # Sharp edges or pixel spikes can confuse the thresholding process.
    # Threshold algorithms (like Otsu’s method) work better when the image is smoothed.
    # It helps ensure that true signals (plastics) stand out from background variations.
    blurred = cv2.GaussianBlur(red, (5, 5), 0)

    axes[0, 2].imshow(blurred)
    axes[0, 2].set_title("Blurred image")
    axes[0, 2].axis('off')

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

    axes[1, 0].imshow(cleaned)
    axes[1, 0].set_title("Cleaned image")
    axes[1, 0].axis('off')

    # Find contours
    # cv2.findContours(image, mode, method) detects contours in a binary image.
    #   mode: cv2.RETR_EXTERNAL retrieves only the outer contours (useful for counting particles)
    #   method: cv2.CHAIN_APPROX_SIMPLE compresses horizontal, vertical, and diagonal segments and leaves only their endpoints.
    #       This reduces memory usage and speeds up contour processing.
    # The contours are stored in a list, where each contour is represented as an array of points.
    # The second return value is the hierarchy of contours, which we don't need here.
    contours, _ = cv2.findContours(cleaned, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    print(f"Found {len(contours)} contours.")

    # Draw contours on the cleaned image
    # This step visualizes the detected contours on the cleaned image.
    # cv2.drawContours(image, contours, contourIdx, color, thickness)
    #   image: the image on which to draw the contours
    #   contours: list of contours to draw
    #   contourIdx: -1 means draw all contours; you can specify an index to draw a specific contour
    #   color: color of the contours (green in this case)
    #   thickness: thickness of the contour lines in pixels
    contour_img = img.copy()
    cv2.drawContours(contour_img, contours, -1, (0, 255, 0), 2)

    # Display the contours on the original image, with colour conversion for proper visualization
    axes[1, 1].imshow(cv2.cvtColor(contour_img, cv2.COLOR_BGR2RGB))
    axes[1, 1].set_title("Contours detected")
    axes[1, 1].axis('off')
    

    # Count valid particles
    count = 0
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if min_area < area < max_area:
            count += 1

    # Categorize result
    if count < low_thresh:
        category = "Low"
    elif count < high_thresh:
        category = "Medium"
    else:
        category = "High"

    print(f"Detected particles: {count} → Category: {category}")

    plt.suptitle("Process of image processing", fontsize=14)
    plt.tight_layout()
    plt.show()

    return count, category

if __name__ == "__main__":
    # Example usage
    image_file = "test_image_3.jpg"
    count, level = analyze_microplastics(image_file)
    print(f"Detected particles: {count} → Category: {level}")