import React, { useEffect, useState } from 'react';
import { fromURL, blobToURL } from 'image-resize-compress';

const SmartImg = ({
  imageUrl,
  height = 300,
  quality = 80,
  previewQuality = 5,
  alt = '',
  style = {},
  ...props
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [optimizedSrc, setOptimizedSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;

    const processImage = async () => {
      try {
        const { width, height: originalHeight } = await getImageSize(imageUrl);
        const newWidth = Math.floor((width / originalHeight) * height);

        // preview (low quality)
        const previewBlob = await fromURL(imageUrl, previewQuality, newWidth, height, 'webp');
        const previewUrl = await blobToURL(previewBlob);
        setPreviewSrc(previewUrl);

        // full (high quality)
        const resizedBlob = await fromURL(imageUrl, quality, newWidth, height, 'webp');
        const blobUrl = await blobToURL(resizedBlob);
        setOptimizedSrc(blobUrl);
      } catch (err) {
        console.error('Failed to optimize image:', err);
        setPreviewSrc(null);
        setOptimizedSrc(null);
      }
    };

    processImage();
  }, [imageUrl, height, quality, previewQuality]);

  const getImageSize = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = url;
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {previewSrc && (
        <img
          src={previewSrc}
          alt={alt}
          loading="lazy"
          style={{
            width: '100%',
            height: 'auto',
            filter: 'blur(20px)',
            transform: 'scale(1.05)',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      {optimizedSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
    </div>
  );
};

export default SmartImg;
