import { Dispatch, SetStateAction, useRef } from "react"
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi"

type ButtonProps = {
  id: string
  type?: string
  value: number
  callback: callback
  change: (num: number, fn: callback) => void
}

type callback = Dispatch<SetStateAction<number>>

export default function TimeButton({
  id,
  type,
  value,
  callback,
  change,
}: ButtonProps) {
  const clickAudioRef = useRef<HTMLAudioElement>(null)

  const handleClick = () => {
    clickAudioRef.current!.play()
    change(value, callback)
  }

  return (
    <>
      <audio id="beep" ref={clickAudioRef} src="/audio/click.wav" />
      <button
        onClick={handleClick}
        id={id}
        className="bg-blue-100 hover:bg-blue-200 duration-50 w-10 h-10 text-lg rounded-full flex items-center justify-center"
      >
        {type === "minus" ? <HiOutlineMinusSm /> : <HiOutlinePlusSm />}
      </button>
    </>
  )
}
