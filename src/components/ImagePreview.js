import React, { useRef, useEffect } from 'react';

function ImagePreview({ bookInfo, coverImage, backgroundImage, layout }) {
  const previewRef = useRef(null);

  useEffect(() => {
    // This effect runs whenever the inputs change
    // You could add more complex logic here if needed
  }, [bookInfo, coverImage, backgroundImage, layout]);

  return (
    <div 
      ref={previewRef}
      style={{
        width: '500px',
        height: '500px',
        position: 'relative',
        border: '1px solid black',
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <img
          src={URL.createObjectURL(backgroundImage)}
          alt="Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute'
          }}
        />
      )}

      {/* Book Cover */}
      {coverImage && (
        <img
          src={URL.createObjectURL(coverImage)}
          alt="Book Cover"
          style={{
            width: '50%',
            position: 'absolute',
            left: '25%',
            top: layout === 'middle' ? '25%' : '50%',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        />
      )}

      {/* Book Info */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        right: '10%',
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h2>{bookInfo.title}</h2>
        <p>{bookInfo.author}</p>
      </div>
    </div>
  );
}

export default ImagePreview;