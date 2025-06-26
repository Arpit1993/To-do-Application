const ClockIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <circle cx={15} cy={15} r={14.5} fill="#fff" stroke="#034EA2" />
    <path fill="#034EA2" d="M12.678 9.8h1.36v9.92h4.4V21h-5.76V9.8Z" />
  </svg>
);
export default ClockIcon;
