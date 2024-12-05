import React, { useState, useRef } from 'react';

// CSS for the BackgroundSelector component
const styles = `
  .background-selector {
    margin: 20px 0;
  }
  .background-gallery {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding: 10px 0;
  }
  .background-option {
    width: 80px;
    height: 80px;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    object-fit: cover;
  }
  .background-option:hover {
    border-color: #007bff;
  }
  .background-option.selected {
    border-color: #28a745;
  }
  .upload-button {
    width: 80px;
    height: 80px;
    border: 2px dashed #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #f8f9fa;
    transition: background-color 0.3s ease;
  }
  .upload-button:hover {
    background-color: #e9ecef;
  }
  .upload-icon {
    font-size: 24px;
    color: #6c757d;
  }
`;

// BackgroundSelector component
// Props:
// - onBackgroundSelect: Function to call when a background is selected
const BackgroundSelector = ({ onBackgroundSelect }) => {
  // Array of predefined background image options
  const [backgroundOptions, setBackgroundOptions] = useState([
    { value: '/path/to/image1.jpg', label: 'Forest' },
    { value: '/path/to/image2.jpg', label: 'Beach' },
    { value: '/path/to/image3.jpg', label: 'Mountains' },
    { value: '/path/to/image4.jpg', label: 'City' },
    { value: '/path/to/image5.jpg', label: 'Abstract' },
  ]);

  // State to keep track of the selected background
  const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0]);

  // Reference to the file input element
  const fileInputRef = useRef(null);

  // Function to handle background selection
  const handleBackgroundSelect = (background) => {
    setSelectedBackground(background);
    onBackgroundSelect(background);
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBackground = {
          value: e.target.result,
          label: 'Custom Upload'
        };
        setBackgroundOptions([newBackground, ...backgroundOptions]);
        handleBackgroundSelect(newBackground);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="background-selector">
      <style>{styles}</style>
      <h3>Select Background Image</h3>
      <div className="background-gallery">
        {/* Upload button */}
        <div className="upload-button" onClick={triggerFileUpload}>
          <span className="upload-icon">+</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {/* Background options */}
        {backgroundOptions.map((background, index) => (
          <img
            key={index}
            src={background.value}
            alt={background.label}
            title={background.label}
            className={`background-option ${selectedBackground === background ? 'selected' : ''}`}
            onClick={() => handleBackgroundSelect(background)}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;