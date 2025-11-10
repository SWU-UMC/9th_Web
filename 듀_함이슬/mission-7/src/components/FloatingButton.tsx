interface FloatingButtonProps {
    onClick?: () => void;
}

export const FloatingButton = ({onClick}: FloatingButtonProps) => {
  return (
    <button
    onClick={onClick}
    className='fixed rounded-full text-[green] bg-gray-100 hover:bg-gray-300
    bottom-10 right-6 z-30 w-14 h-14'>
      +
    </button>
  )
}

export default FloatingButton
