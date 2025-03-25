import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import { Timer } from "./components/Timer";
import { Form } from "./components/Form";
import { QUERY_PARAMS_MAP } from "./constants";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateTime, setDateTime] = useState("");
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dt = searchParams.get(QUERY_PARAMS_MAP.dateTime);
    const c = searchParams.get(QUERY_PARAMS_MAP.color);
    const t = searchParams.get(QUERY_PARAMS_MAP.title);
    const sc = searchParams.get(QUERY_PARAMS_MAP.showConfetti);

    setDateTime(dt || "");
    setColor(c || "");
    setTitle(t || "");
    setShowConfetti(Boolean(sc));
    setIsLoading(false);
  }, []);

  const handleStart = ({
    date,
    time,
    color,
    title,
    showConfetti,
  }: {
    date: string;
    time: string;
    color: string;
    title: string;
    showConfetti: boolean;
  }) => {
    const dt = `${date}T${time}`;
    const queryParams = new URLSearchParams();

    queryParams.set(QUERY_PARAMS_MAP.dateTime, dt);
    queryParams.set(QUERY_PARAMS_MAP.color, color);
    queryParams.set(QUERY_PARAMS_MAP.title, title);
    queryParams.set(QUERY_PARAMS_MAP.showConfetti, String(showConfetti));
    window.location.assign(`?${queryParams.toString()}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen items-center justify-center">
      <div>
        {dateTime ? (
          <>
            {title && (
              <p className="mb-4 lg:mb-6 font-medium text-xl lg:text-2xl">
                {title}
              </p>
            )}
            <Timer dateTime={dateTime} color={color} />
            {showConfetti && <Confetti numberOfPieces={100} />}
          </>
        ) : (
          <>
            <p className="font-medium text-3xl mb-3 pb-2 border-b border-gray-200">
              Countdown
            </p>
            <Form onSubmit={handleStart} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
