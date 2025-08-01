import React from "react";

const NextOrderStatus = () => {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width={29}
        height={29}
        rx="7.5"
        fill="#2C2C2E"
        stroke="url(#paint0_linear_9353_5172)"
      />
      <g clipPath="url(#clip0_9353_5172)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.0579 8.95899C23.4414 9.34962 23.4414 9.98242 23.0579 10.3731L14.3007 19.2924C14.2879 19.3054 14.2751 19.3184 14.2636 19.3301C13.9683 19.6309 13.6832 19.9226 13.4148 20.1296C13.113 20.3653 12.7219 20.5853 12.2182 20.5853C11.7145 20.5853 11.3233 20.3653 11.0216 20.1296C10.7531 19.9226 10.4681 19.6309 10.1727 19.3301C10.1612 19.3184 10.1484 19.3054 10.1357 19.2924L6.94219 16.0398C6.55866 15.6492 6.55866 15.0164 6.94219 14.6257C7.32572 14.2351 7.94701 14.2351 8.33055 14.6257L11.524 17.8783C11.8705 18.2312 12.0622 18.4239 12.2118 18.5398C12.2144 18.5411 12.2169 18.5437 12.2182 18.545C12.2195 18.5437 12.222 18.5411 12.2246 18.5398C12.3742 18.4239 12.5659 18.2312 12.9124 17.8783L21.6695 8.95899C22.0531 8.56836 22.6743 8.56836 23.0579 8.95899Z"
          fill="url(#paint1_linear_9353_5172)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_9353_5172"
          x1="-11.2"
          y1="27.2867"
          x2="50.4436"
          y2="2.95004"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFE00" />
          <stop offset={1} stopColor="#FFFFCE" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_9353_5172"
          x1="0.423242"
          y1="19.5073"
          x2="30.7854"
          y2="2.72177"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFE00" />
          <stop offset={1} stopColor="#FFFFCE" />
        </linearGradient>
        <clipPath id="clip0_9353_5172">
          <rect
            width={18}
            height={13}
            fill="white"
            transform="translate(6 8)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NextOrderStatus;
