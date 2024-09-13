import React, { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';

function ImageCanvas({ book, layout }) {
  const canvasRef = useRef(null);
  const [proxyImageUrl, setProxyImageUrl] = useState('');

  useEffect(() => {
    // Use your server endpoint to fetch the image
    setProxyImageUrl(`http://localhost:5001/proxy-image?url=${encodeURIComponent(book.cover)}`);
  }, [book.cover]);

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
      });
  };

  return (
    <div>
      <div 
        ref={canvasRef} 
        style={{ 
          width: '1080px', 
          height: '1080px', 
          position: 'relative',
          backgroundColor: 'black' // You can change this or make it customizable
        }}
      >
        {layout === 'middle' ? (
          <>
            <img 
              src={proxyImageUrl} // Use the proxied image URL here
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
              color: 'white' // Ensure text is visible on black background
            }}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          </>
        ) : (
          <>
            <img 
              src={proxyImageUrl} // Use the proxied image URL here
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
              color: 'white' // Ensure text is visible on black background
            }}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          </>
        )}
      </div>
      <button onClick={generateImage}>Generate and Download Image</button>
    </div>
  );
}

export default ImageCanvas;