import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import BookInfoForm from './BookInfoForm';
import ImageSelector from './ImageSelector';
import LayoutSelector from './LayoutSelector';
import ImagePreview from './ImagePreview';

function BookCoverGenerator() {
  const [bookInfo, setBookInfo] = useState({ title: '', author: '' });
  const [coverImage, setCoverImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [layout, setLayout] = useState('middle');
  const previewRef = useRef(null);

  const handleBookSelect = (info) => setBookInfo(info);
  const handleCoverImageSelect = (image) => setCoverImage(image);
  const handleBackgroundImageSelect = (image) => setBackgroundImage(image);
  const handleLayoutChange = (newLayout) => setLayout(newLayout);

  const generateImage = () => {
    if (previewRef.current === null) {
      return;
    }

    toPng(previewRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'book-cover.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  return (
    <div>
      <h2>Book Cover Generator</h2>
      <BookInfoForm onBookSelect={handleBookSelect} />
      <ImageSelector label="Cover Image" onImageSelect={handleCoverImageSelect} />
      <ImageSelector label="Background Image" onImageSelect={handleBackgroundImageSelect} />
      <LayoutSelector currentLayout={layout} onLayoutChange={handleLayoutChange} />
      <div ref={previewRef}>
        <ImagePreview 
          bookInfo={bookInfo}
          coverImage={coverImage}
          backgroundImage={backgroundImage}
          layout={layout}
        />
      </div>
      <button onClick={generateImage}>Generate and Download Image</button>
    </div>
  );
}

export default BookCoverGenerator;