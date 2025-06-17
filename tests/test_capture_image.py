import pytest
import os
from unittest.mock import patch, MagicMock
from pathlib import Path

project_root = Path(__file__).parent.parent

import sys
sys.path.insert(0, str(project_root))

from software.capture_image import capture_image

def test_capture_image_creates_directory():
    """Test that capture_image creates output directory"""
    with patch('subprocess.run') as mock_run:
        mock_run.return_value = MagicMock(returncode=0)
        test_dir = "test_captures"
        
        # Remove directory if it exists
        if os.path.exists(test_dir):
            os.rmdir(test_dir)
        
        capture_image(test_dir)
        assert os.path.exists(test_dir)
        
        # Cleanup
        os.rmdir(test_dir)

def test_capture_image_naming():
    """Test that capture_image generates correct file naming pattern"""
    with patch('subprocess.run') as mock_run:
        mock_run.return_value = MagicMock(returncode=0)
        path = capture_image()
        
        assert path.startswith("captures/sample_")
        assert path.endswith(".jpg")
        assert "captures" in path

def test_capture_image_failure():
    """Test that capture_image handles failures appropriately"""
    with patch('subprocess.run') as mock_run:
        mock_run.return_value = MagicMock(returncode=1)
        
        with pytest.raises(RuntimeError) as exc_info:
            capture_image()
        
        assert "Image capture failed" in str(exc_info.value)