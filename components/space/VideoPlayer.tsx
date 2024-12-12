/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export const VideoPlayer = ({ videoLink }: { videoLink: string }) => {

  const videoRef = useRef(null);

  console.log({ videoLink })
  const videoUrl = `https://d3eyp937ijscg0.cloudfront.net/${videoLink}/playlist.m3u8`


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
        controls={true}
        style={{ maxWidth: '100%' }}
      ></video>
    </div>
  );
}
