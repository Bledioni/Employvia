import React from 'react';

const GuestProfilePhoto = () => {
  return (
    <div
      className="relative flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full overflow-hidden" // w-12/h-12 is 3rem
      aria-label="Guest Profile Photo"
      // Added margin auto to center the component if it's the only block element in a container
      style={{ margin: '0 auto' }} 
    >
      {/* SVG for a generic white person icon */}
      <svg
        className="absolute w-8 h-8 text-gray-700 animate-pulse-blur" // Added animate-pulse-blur class
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
      {/*
        CSS for the blur animation is defined globally or in a separate CSS file.
        For demonstration, here's how you'd define it if Tailwind was configured to accept custom keyframes,
        or how you'd put it in a separate CSS file imported into your project.
      */}
      <style>
        {`
        @keyframes pulse-blur {
          0%, 100% { filter: blur(0px); opacity: 1; }
          50% { filter: blur(3px); opacity: 0.7; }
        }

        .animate-pulse-blur {
          animation: pulse-blur 2s infinite ease-in-out;
        }
        `}
      </style>
    </div>
  );
};

export default GuestProfilePhoto;
