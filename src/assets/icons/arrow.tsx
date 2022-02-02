type ArrowProps = {
  direction: 'right' | 'left'
}

const Arrow: React.FC<ArrowProps> = ({direction}) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{transform: direction === 'left' ? 'rotate(180deg)' : ''}}
    >
      <path
        d="M1 13L7 7L1 1"
        stroke="#3F3F3F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Arrow;