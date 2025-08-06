export const Shadow = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="26521"
      height="20597"
      viewBox="0 0 26521 20597"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ifn_152_9)">
        <path
          d="M15500.8 8477.15C13405.7 4526.25 9571.32 3379.09 7916 3299.37C1541.17 2477.82 3029.16 10094.1 4604.45 13436.3L20976.6 17359C22659.5 15057.9 25066.6 10490.9 21231.2 10631.1C17395.7 10771.3 15812.9 9253.55 15500.8 8477.15Z"
          fill="#1964F2"
        />
        <path
          d="M15500.8 8477.15C13405.7 4526.25 9571.32 3379.09 7916 3299.37C1541.17 2477.82 3029.16 10094.1 4604.45 13436.3L20976.6 17359C22659.5 15057.9 25066.6 10490.9 21231.2 10631.1C17395.7 10771.3 15812.9 9253.55 15500.8 8477.15Z"
          stroke="#1964F4"
        />
      </g>
      <defs>
        <filter
          id="filter0_ifn_152_9"
          x="0.811768"
          y="0.522217"
          width="26520.1"
          height="20595.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="319" dy="241" />
          <feGaussianBlur stdDeviation="125" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_152_9"
          />
          <feGaussianBlur
            stdDeviation="1618.4"
            result="effect2_foregroundBlur_152_9"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="10 10"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="6678"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="effect2_foregroundBlur_152_9"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
          <feComposite
            operator="in"
            in2="noise1Clipped"
            in="color1Flood"
            result="color1"
          />
          <feMerge result="effect3_noise_152_9">
            <feMergeNode in="effect2_foregroundBlur_152_9" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};
