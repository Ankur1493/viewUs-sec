"use client";
import React, { useEffect } from "react";

function page() {
  useEffect(() => {
    // Create a script element to load the iframeResizer script
    const script = document.createElement("script");
    script.src = "https://testimonial.to/js/iframeResizer.min.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      // Initialize iFrameResize after the script is loaded
      if (window.iFrameResize) {
        window.iFrameResize(
          { log: false, checkOrigin: false },
          "#testimonialto-calenso-tag-all-light"
        );
      }
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-screen h-full">
      {" "}
      {/* <script
        type="text/javascript"
        src="https://testimonial.to/js/iframeResizer.min.js"
      ></script> */}
      <iframe
        id="testimonialto-calenso-tag-all-light"
        src="https://embed-v2.testimonial.to/w/calenso?theme=light&card=base&loadMore=on&initialCount=20&tag=all&cc=off"
        frameBorder="0"
        scrolling="no"
        width="100%"
      ></iframe>
      {/* <script type="text/javascript">
        iFrameResize({log: false, checkOrigin: false},
        '#testimonialto-calenso-tag-all-light');
      </script> */}
    </div>
  );
}

export default page;
