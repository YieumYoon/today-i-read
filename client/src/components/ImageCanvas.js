import React, { useEffect, useState } from 'react';

function ImageCanvas({ book, layout, backgroundImage, canvasRef }) {
  const [proxyImageUrl, setProxyImageUrl] = useState('');

  useEffect(() => {
    // Use your server endpoint to fetch the image
    setProxyImageUrl(`http://localhost:5001/proxy-image?url=${encodeURIComponent(book.cover)}`);
  }, [book.cover]);

  return (
    <div>
      <div 
        ref={canvasRef} 
        style={{ 
          width: '1080px', 
          height: '1080px', 
          position: 'relative',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {layout === 'middle' ? (
          <>
            <img 
              src={proxyImageUrl} 
              alt={book.title} 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '60%',
                maxHeight: '60%'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'white', // Set text color to white for better visibility on various backgrounds
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)' // Add text shadow for better readability
            }}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          </>
        ) : (
          <>
            <img 
              src={proxyImageUrl} 
              alt={book.title} 
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                maxWidth: '40%',
                maxHeight: '40%'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '10%',
              transform: 'translateY(-50%)',
              color: 'white', // Set text color to white for better visibility on various backgrounds
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)' // Add text shadow for better readability
            }}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageCanvas;