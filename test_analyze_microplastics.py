import pytest
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
from analyze_microplastics import analyze_microplastics
import os

# Test suite for the analyze_microplastics function
@pytest.fixture
def test_images_dir():
    return "./test-images"

def test_analyze_microplastics_returns_correct_types():
    """Test that the function returns the expected types"""
    image_path = "./test-images/test_image_1.jpg"
    count, category = analyze_microplastics(image_path, show_plot=False)
    assert isinstance(count, int)
    assert isinstance(category, str)
    assert category in ["Low", "Medium", "High"]

def test_analyze_microplastics_handles_thresholds():
    """Test that the category thresholds work correctly"""
    image_path = "./test-images/test_image_1.jpg"
    
    # Test with very high thresholds (should result in "Low")
    count, category = analyze_microplastics(image_path, low_thresh=1000, high_thresh=2000, show_plot=False)
    assert category == "Low"
    
    # Test with very low thresholds (should result in "High")
    count, category = analyze_microplastics(image_path, low_thresh=1, high_thresh=2, show_plot=False)
    assert category == "High"

def test_analyze_microplastics_zero_thresholds():
    """Test behavior with zero thresholds"""
    image_path = "./test-images/test_image_1.jpg"
    count, category = analyze_microplastics(image_path, low_thresh=0, high_thresh=0, show_plot=False)
    assert category == "High"  # Any count > 0 should be "High" with zero thresholds

def test_analyze_microplastics_equal_thresholds():
    """Test behavior when low_thresh equals high_thresh"""
    image_path = "./test-images/test_image_1.jpg"
    count, category = analyze_microplastics(image_path, low_thresh=10, high_thresh=10, show_plot=False)
    assert category in ["Low", "Medium", "High"]  # Should handle this case gracefully

def test_analyze_microplastics_area_filters():
    """Test that the area filters work correctly"""
    image_path = "./test-images/test_image_1.jpg"
    
    # Test with very small area range
    count1, _ = analyze_microplastics(image_path, min_area=1, max_area=2, show_plot=False)
    
    # Test with larger area range
    count2, _ = analyze_microplastics(image_path, min_area=1, max_area=10000, show_plot=False)
    
    # There should be more particles detected with the larger area range
    assert count2 >= count1

def test_analyze_microplastics_negative_area():
    """Test that negative areas are handled appropriately"""
    image_path = "./test-images/test_image_1.jpg"
    count1, _ = analyze_microplastics(image_path, min_area=-10, max_area=5000, show_plot=False)
    count2, _ = analyze_microplastics(image_path, min_area=10, max_area=5000, show_plot=False)
    assert count1 == count2  # Negative min_area should be treated as 0

def test_analyze_microplastics_invalid_image():
    """Test that the function handles invalid image paths appropriately"""
    with pytest.raises(Exception):
        analyze_microplastics("nonexistent_image.jpg", show_plot=False)

# Test that the function can handle multiple images consistently
@pytest.mark.parametrize("test_image", [
    "test_image_1.jpg",
    "test_image_2.jpg",
    "test_image_3.jpg",
])
# This will run the test for each image in the list
def test_analyze_microplastics_consistent_results(test_image):
    """Test that results are consistent for the same image"""
    image_path = os.path.join("./test-images", test_image)
    count1, cat1 = analyze_microplastics(image_path, show_plot=False)
    count2, cat2 = analyze_microplastics(image_path, show_plot=False)
    assert count1 == count2
    assert cat1 == cat2

def test_analyze_microplastics_inverted_area_bounds():
    """Test that the function handles min_area > max_area gracefully"""
    image_path = "./test-images/test_image_1.jpg"
    with pytest.raises(ValueError):
        analyze_microplastics(image_path, min_area=1000, max_area=10, show_plot=False)

def test_all_test_images():
    """Test that all test images can be processed without errors"""
    test_dir = "./test-images"
    for image_file in os.listdir(test_dir):
        if image_file.endswith(('.jpg', '.jpeg')):
            image_path = os.path.join(test_dir, image_file)
            count, category = analyze_microplastics(image_path, show_plot=False)
            assert count >= 0
            assert category in ["Low", "Medium", "High"]
