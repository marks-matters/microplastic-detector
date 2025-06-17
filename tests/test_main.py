from unittest.mock import patch
from pathlib import Path
import sys

project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from software.main import run_capture_and_analysis

def test_run_capture_and_analysis():
    """Test the main analysis pipeline"""
    with patch('software.main.capture_image') as mock_capture, \
         patch('software.main.analyze_microplastics') as mock_analyze:
        
        # Mock return values
        mock_capture.return_value = "test_image.jpg"
        mock_analyze.return_value = (10, "Medium")
        
        # Run the function
        run_capture_and_analysis()
        
        # Verify calls
        mock_capture.assert_called_once()
        mock_analyze.assert_called_once_with("test_image.jpg")