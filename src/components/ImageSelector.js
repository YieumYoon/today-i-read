import React, { useState } from 'react';

// ImageSelector component allows users to select an image file
// It accepts two props:
// - label: A string to describe what kind of image is being selected
// - onImageSelect: A function to call when an image is selected
function ImageSelector({ label, onImageSelect }) {
  // State to store the selected image file
  const [selectedFile, setSelectedFile] = useState(null);
  // State to store the preview URL of the selected image
  const [previewUrl, setPreviewUrl] = useState(null);

  // This function is called when a file is selected
  const handleFileChange = (event) => {
    // Get the selected file from the input element
    const file = event.target.files[0];
    
    if (file && file.type.substr(0, 5) === "image") {
      // If a file is selected and it's an image...
      setSelectedFile(file);
      
      // Create a URL for the selected file to use as a preview
      setPreviewUrl(URL.createObjectURL(file));
      
      // Call the onImageSelect prop function with the selected file
      onImageSelect(file);
    } else {
      // If the selected file is not an image, reset the state
      setSelectedFile(null);
      setPreviewUrl(null);
      // You might want to add some error handling here
    }
  };

  return (
    <div>
      <label>
        {label}
        {/* File input element. We hide this and use a custom button for better styling */}
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {/* Custom styled button to trigger file selection */}
        <button onClick={() => document.querySelector('input[type="file"]').click()}>
          Select Image
        </button>
      </label>
      
      {/* If a file is selected, display its name */}
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      
      {/* If we have a preview URL, display the image preview */}
      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageSelector;