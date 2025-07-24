// A simple SVG animation of a sailboat.
// This is a creative way to show a loading state that fits the brand.
function SailingYachtLoader() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-pulse"
      aria-label="Loading page"
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

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
     <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <SailingYachtLoader />
    </div>
  )
}
