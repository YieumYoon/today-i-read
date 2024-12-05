import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import BookSearchModal from './BookSearchModal';
import ImageCanvas from './ImageCanvas';
import BackgroundSelector from './BackgroundSelector';

function BookCoverGenerator() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [layout, setLayout] = useState('middle');
  // State for selected background image, initialized with the first predefined background
  const [selectedBackground, setSelectedBackground] = useState({ value: '/path/to/image1.jpg', label: 'Forest' });
  const canvasRef = useRef(null);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  // Function to handle background selection
  const handleBackgroundSelect = (background) => {
    setSelectedBackground(background);
  };

  const generateImage = () => {
    if (canvasRef.current === null) {
      return;
    }

    toPng(canvasRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'book-cover.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      })
  }
  return (
    <div>
      <h2>Book Cover Generator</h2>
      {selectedBook && (
        <ImageCanvas 
          book={selectedBook} 
          layout={layout} 
          backgroundImage={selectedBackground.value} // Pass the selected background image
        />
      )}
      <BookSearchModal onBookSelect={handleBookSelect} />
      <div>
        <button onClick={() => handleLayoutChange('middle')}>Middle Layout</button>
        <button onClick={() => handleLayoutChange('bottomRight')}>Bottom Right Layout</button>
      </div>
      <BackgroundSelector onBackgroundSelect={handleBackgroundSelect} />
      <button onClick={generateImage}>Generate and Download Image</button>
    </div>
  );
}

export default BookCoverGenerator;