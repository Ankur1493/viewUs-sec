function Iframe() {
  return (
    <div>
      <script async src="http://embed.viewus.in/iframeEmbedder.js" />
      <iframe
        id="testimonial-frame"
        src="http://embed.viewus.in?slug=viewus&cardBorderRadius=medium"
        scrolling="no"
        frameBorder="0"
        width="90%"
      />

      <iframe
        id="testimonial-frame"
        src="http://embed.viewus.in?slug=viewus&animated=on&cardBorderRadius=medium"
        scrolling="no"
        frameBorder="0"
        width="90%"
      />
    </div>
  );
}

export default Iframe;
