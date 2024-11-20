//@ts-nocheck
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export const VideoPlayer = () => {

  const videoRef = useRef(null);

  const videoUrl =
    'https://d3eyp937ijscg0.cloudfront.net/videos/cm2do1ckp0000zg2h70xfszha-bakedui-uditkapoor060@gmail.com';

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari or other HLS-supported browsers
      video.src = videoUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [videoUrl]);

  return (
    <div>
      <video
        ref={videoRef}
        width='640'
        height='360'
        style={{ maxWidth: '100%' }}
      ></video>
    </div>
  );
}
