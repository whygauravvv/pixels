export function BloomFilter() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      className="absolute"
      aria-hidden
    >
      <defs>
        <filter
          id="bloom"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feComponentTransfer in="SourceGraphic" result="bright">
            <feFuncR type="linear" slope={3} intercept={-0.5} />
            <feFuncG type="linear" slope={3} intercept={-0.5} />
            <feFuncB type="linear" slope={3} intercept={-0.5} />
          </feComponentTransfer>
          <feGaussianBlur in="bright" stdDeviation={1.5} result="blur1" />
          <feGaussianBlur in="blur1" stdDeviation={3} result="blur2" />
          <feBlend in="SourceGraphic" in2="blur2" mode="lighten" />
        </filter>
      </defs>
    </svg>
  );
}
