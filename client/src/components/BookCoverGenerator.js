import React, { useState } from 'react';
import BookSearchModal from './BookSearchModal';
import ImageCanvas from './ImageCanvas';

function BookCoverGenerator() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [layout, setLayout] = useState('middle'); // 'middle' or 'bottomRight'

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div>
      <h2>Book Cover Generator</h2>
      <BookSearchModal onBookSelect={handleBookSelect} />
      <div>
        <button onClick={() => handleLayoutChange('middle')}>Middle Layout</button>
        <button onClick={() => handleLayoutChange('bottomRight')}>Bottom Right Layout</button>
      </div>
      {selectedBook && (
        <ImageCanvas 
          book={selectedBook} 
          layout={layout} 
        />
      )}
    </div>
  );
}

export default BookCoverGenerator;