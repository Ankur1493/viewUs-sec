import React from "react";

export const FeatureShadow = ({
  className,
  color = "#1264ff",
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      viewBox="0 0 9402 10959"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_fng_100_5)">
        <path
          d="M1384.54 5373.33C-1006.39 3928.51 2386.79 7681.9 3445.17 9196.33C7100.17 12348.5 8729.92 8407.86 8853 8035.65C8476.53 6853.66 7971.73 2672.08 6899.44 970.693C5827.14 -730.693 6509.49 5257.09 6737.5 6351C7052.88 7331.97 5429.08 4213.64 3306.66 1271.16C1184.23 -1671.31 3762.47 5203.84 4804.5 7112.5C5173.15 8322.9 1936.46 5584.29 1384.54 5373.33Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_fng_100_5"
          x="0.299988"
          y="0.25116"
          width="9401.4"
          height="10958.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            stdDeviation="274.35"
            result="effect1_foregroundBlur_100_5"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.83333331346511841 0.83333331346511841"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="3345"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="effect1_foregroundBlur_100_5"
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
          <feMerge result="effect2_noise_100_5">
            <feMergeNode in="effect1_foregroundBlur_100_5" />
            <feMergeNode in="color1" />
          </feMerge>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.23809525370597839 0.23809525370597839"
            numOctaves="3"
            seed="4428"
          />
          <feDisplacementMap
            in="effect2_noise_100_5"
            scale="82.199996948242188"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
          />
          <feMerge result="effect3_texture_100_5">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};
