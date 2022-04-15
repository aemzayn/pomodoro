import React from "react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Countdown, {
  zeroPad,
  CountdownRenderProps,
  CountdownApi,
} from "react-countdown"
import {
  BsPlayFill as PlayIcon,
  BsFillPauseFill as PauseIcon,
} from "react-icons/bs"
import { MdRefresh as ResetIcon } from "react-icons/md"

interface TimerProps {
  sessionLen: number
  breakLen: number
  mode: "session" | "break"
  resetSession: () => void
  setMode: Dispatch<SetStateAction<"session" | "break">>
  resetTime: () => void
  setSession: (session: boolean) => void
}

export const Timer: React.FC<TimerProps> = ({
  sessionLen,
  breakLen,
  mode,
  resetSession,
  setMode,
  resetTime,
  setSession,
}) => {
  const [timerState, setTimerState] = useState("stopped")
  const audioRef = useRef<HTMLAudioElement>(null)
  const convertToMinute = (time: number) => {
    return Date.now() + 1000 * 60 * time
  }

  useEffect(() => {
    setDate(convertToMinute(sessionLen))
  }, [sessionLen])

  const countdownApi = useRef<CountdownApi | null>(null)

  const [paused, setPaused] = useState(false)

  const [date, setDate] = useState(
    convertToMinute(mode === "session" ? sessionLen : breakLen)
  )

  const handleTimer = () => {
    if (timerState === "stopped") {
      handleStartClick()
      setTimerState("running")
    } else {
      handlePauseClick()
      setTimerState("stopped")
    }
  }

  const handleStartClick = () => {
    countdownApi && countdownApi.current && countdownApi.current!.start()
    setPaused(false)
  }

  const handlePauseClick = () => {
    countdownApi && countdownApi.current && countdownApi.current!.pause()
    setPaused(true)
  }

  const handleResetClick = () => {
    setTimerState("stopped")
    setDate(convertToMinute(sessionLen))
    resetSession()
    resetTime()
    audioRef.current!.pause()
    audioRef.current!.currentTime = 0
    setPaused(false)
  }

  const handleCompleted = async () => {
    let nextSession: "break" | "session"
    let nextTimer: number
    if (mode === "session") {
      nextSession = "break"
      nextTimer = breakLen
      setSession(false)
    } else {
      nextSession = "session"
      nextTimer = sessionLen
      setSession(true)
    }

    setMode(() => nextSession)

    audioRef.current!.play()
    audioRef.current!.onended = () => {
      setDate(() => convertToMinute(nextTimer))
      countdownApi.current!.start()
    }
  }

  const renderer = ({ minutes, seconds }: CountdownRenderProps) => {
    return (
      <h1 id="timer-left" className="text-8xl select-none font-thin">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </h1>
    )
  }

  return (
    <>
      <Countdown
        key={date}
        ref={countdownApi as any}
        date={date}
        onComplete={handleCompleted}
        autoStart={false}
        renderer={renderer}
      />
      <div className="flex gap-1 mt-4">
        <button
          className="p-1 hover:bg-blue-300 rounded-full"
          id="start_stop"
          onClick={handleTimer}
        >
          {timerState !== "running" ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button
          id="reset"
          className="p-1 hover:bg-blue-300 rounded-full"
          onClick={handleResetClick}
        >
          <ResetIcon />
        </button>
        <audio id="beep" ref={audioRef} src="/audio/beep.wav" />
      </div>
    </>
  )
}

export default Timer
