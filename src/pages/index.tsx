import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button, Layout, Timer } from '../components'

export default function App() {
  const [breakLen, setBreakLen] = useState(5);
  const [sessionLen, setSessionLen] = useState<number>(25);
  const [isSession, setIsSession] = useState(true);
  const [mode, setMode] = useState<"session" | "break" >("session");

  function changeLength(num: number, fn: Dispatch<SetStateAction<number>>) {
    fn((br: number) => (br + num < 1 || br + num >= 60 ? br : br + num));
  }

  function resetSession() {
    setIsSession(true);
  }

  function resetTime() {
    setSessionLen(25);
    setBreakLen(5);
  }

  return (
    <Layout>
      <main className="flex bg-blue-300 rounded-lg shadow-xl">
        <div className="w-72  flex flex-col justify-between p-5 bg-blue-400  rounded-lg">
          <div id="timer-label" className="text-lg text-right text-blue-200">
            {isSession ? "Session" : "Break"}
          </div>

          <Timer
            resetSession={resetSession}
            sessionLen={sessionLen}
            breakLen={breakLen}
            mode={mode}
            setMode={setMode}
            resetTime={resetTime}
          />
        </div>
        <div className="flex flex-col p-5 gap-2">
          <div className="flex flex-col">
            <h3 id="session-label" className="mb-2">
              Session Length
            </h3>
            <div className="flex items-center justify-between w-32">
              <Button
                id="session-decrement"
                change={changeLength}
                value={1}
                callback={setSessionLen}
              />
              <div id="session-length">{sessionLen}</div>
              <Button
                id="session-increment"
                type="minus"
                change={changeLength}
                value={-1}
                callback={setSessionLen}
              />
            </div>
          </div>
          <hr className="mt-2 border-blue-200" />

          <div className="flex flex-col ">
            <h3 id="break-label" className="mb-2">
              Break Length
            </h3>
            <div className="flex items-center justify-between w-32">
              <Button
                id="break-increment"
                change={changeLength}
                callback={setBreakLen}
                value={1}
              />
              <div id="break-length">{breakLen}</div>
              <Button
                id="break-decrement"
                type="minus"
                change={changeLength}
                callback={setBreakLen}
                value={-1}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
