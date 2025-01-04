function Iframe() {
  return (
    <div>
      {/* long testimonial cards with 2 rows */}
      <div className="w-[100%] md:w-[90%] h-screen md:h-[80vh] lg:h-screen rounded-xl max-w-screen-2xl">
        <iframe
          src="http://localhost:5173/w/carousal?slug=viewus&animated=on&rows=&shadow=ffffff&outerRadius=high"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          style={{
            border: "none",
          }}
        ></iframe>
      </div>

      {/* long testimonial cards with single row */}
      <div className="w-[100%] md:w-[90%] h-[70vh] md:h-[50vh] lg:h-[60vh] rounded-xl max-w-screen-2xl">
        <iframe
          src="http://localhost:5173/w/carousal?slug=viewus&animated=&rows=&shadow=ffffff&outerRadius=high"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          style={{
            border: "none",
          }}
        ></iframe>
      </div>

      <div className="w-[95%] md:w-[90%] h-screen rounded-xl scrollbar-hidden max-w-screen-2xl">
        <iframe
          src="https://embed.viewus.in/?slug=viewus&animated=on&cardBorderRadius=medium"
          width="100%"
          height="100%"
          style={{
            border: "none",
          }}
        ></iframe>
      </div>
    </div>
  );
}

export default Iframe;
