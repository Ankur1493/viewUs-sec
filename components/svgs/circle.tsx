export const Circle = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 17174 17174"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ifn_153_10)">
        <circle cx="8587" cy="8587" r="5349" fill="#1264FF" />
        <circle cx="8587" cy="8587" r="5349" stroke="#1264FF" />
      </g>
      <defs>
        <filter
          id="filter0_ifn_153_10"
          x="0.699951"
          y="0.699951"
          width="17172.6"
          height="17172.6"
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
            result="effect1_innerShadow_153_10"
          />
          <feGaussianBlur
            stdDeviation="1618.4"
            result="effect2_foregroundBlur_153_10"
          />
        </filter>
      </defs>
    </svg>
  );
};
