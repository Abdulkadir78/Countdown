import { useRef } from "react";

interface FormProps {
  onSubmit: (obj: {
    date: string;
    time: string;
    color: string;
    title: string;
    showConfetti: boolean;
  }) => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const confettiRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = dateRef.current?.value || "";
    const time = timeRef.current?.value || "";
    const color = colorRef.current?.value || "";
    const title = titleRef.current?.value || "";
    const showConfetti = confettiRef.current?.checked || false;

    onSubmit({ date, time, color, title, showConfetti });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label id="date-time" className="pl-1 text-sm">
          Enter Date & Time
        </label>

        <div className="flex items-center gap-2 mt-1">
          <input
            ref={dateRef}
            type="date"
            className="border rounded-sm py-2 px-3 w-full sm:w-[180px] appearance-none"
            aria-labelledby="date-time"
            required
          />
          <input
            ref={timeRef}
            type="time"
            className="border rounded-sm py-2 px-3 w-full sm:w-[180px]"
            aria-labelledby="date-time"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="color" className="text-sm">
          Select a color{" "}
          <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <span className="block text-xs text-gray-500">
          This will be the color of the timer
        </span>
        <input
          ref={colorRef}
          type="color"
          id="color"
          className="block mt-1"
          defaultValue="#1a1a1a"
        />
      </div>

      <div>
        <label htmlFor="title" className="text-sm">
          Enter a title{" "}
          <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          className="mt-1 block border rounded-sm py-2 px-3 w-full"
        />
      </div>

      <div className="flex items-center gap-1">
        <input
          ref={confettiRef}
          type="checkbox"
          id="confetti"
          className="w-[16px] h-[16px]"
        />
        <label htmlFor="confetti" className="text-sm">
          Show Confetti{" "}
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 border rounded-sm py-1.5 px-10 bg-green-600 text-white cursor-pointer"
      >
        Start
      </button>
    </form>
  );
};
