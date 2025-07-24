// A simple SVG animation of a sailboat.
// This is a creative way to show a loading state that fits the brand.
export function SailingYachtLoader() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-pulse"
    >
      <path
        d="M6 20L12 4L18 20H6Z"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M4 20H20"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <style>
        {`
          @keyframes sail {
            0% { transform: translateX(-15px) rotate(-5deg); }
            50% { transform: translateX(5px) rotate(3deg); }
            100% { transform: translateX(-15px) rotate(-5deg); }
          }
          svg {
            animation: sail 3s ease-in-out infinite;
          }
        `}
      </style>
    </svg>
  );
}
