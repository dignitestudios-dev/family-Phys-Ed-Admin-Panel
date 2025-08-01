import React from "react";

const CurrentOrderStatus = () => {
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
        fill="url(#paint0_linear_9353_5171)"
        stroke="url(#paint1_linear_9353_5171)"
      />
      <g clipPath="url(#clip0_9353_5171)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.0577 8.95899C23.4413 9.34962 23.4413 9.98242 23.0577 10.3731L14.3006 19.2924C14.2878 19.3054 14.275 19.3184 14.2635 19.3301C13.9682 19.6309 13.6831 19.9226 13.4146 20.1296C13.1129 20.3653 12.7217 20.5853 12.2181 20.5853C11.7144 20.5853 11.3232 20.3653 11.0215 20.1296C10.753 19.9226 10.4679 19.6309 10.1726 19.3301C10.1611 19.3184 10.1483 19.3054 10.1355 19.2924L6.94207 16.0398C6.55854 15.6492 6.55854 15.0164 6.94207 14.6257C7.3256 14.2351 7.94689 14.2351 8.33042 14.6257L11.5239 17.8783C11.8703 18.2312 12.0621 18.4239 12.2117 18.5398C12.2142 18.5411 12.2168 18.5437 12.2181 18.545C12.2194 18.5437 12.2219 18.5411 12.2245 18.5398C12.374 18.4239 12.5658 18.2312 12.9123 17.8783L21.6694 8.95899C22.053 8.56836 22.6742 8.56836 23.0577 8.95899Z"
          fill="#282828"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_9353_5171"
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
          id="paint1_linear_9353_5171"
          x1="-11.2"
          y1="27.2867"
          x2="50.4436"
          y2="2.95004"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFE00" />
          <stop offset={1} stopColor="#FFFFCE" />
        </linearGradient>
        <clipPath id="clip0_9353_5171">
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

export default CurrentOrderStatus;
