
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);

  const handleClick = (value: string) => {
    if (result !== null && /[0-9.]/.test(value)) {
      setInput(value);
      setResult(null);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult.toString());
      setHistory(prev => [{ expr: input, result: evalResult.toString() }, ...prev]);
    } catch {
      setResult("Error");
      setHistory(prev => [{ expr: input, result: "Error" }, ...prev]);
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "+", "="]
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 px-2">
      {/* Well-designed Title */}
      <header className="w-full flex flex-col items-center mt-8 mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg mb-2 text-center tracking-tight">
          Calculator
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-medium text-center max-w-xl">
          Simple, fast, and easy-to-use calculator. View your previous calculations in the history below.
        </p>
      </header>
      <div
        className="bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl border border-gray-800 p-4 sm:p-8 flex flex-col justify-center"
        style={{ minHeight: '420px' }}
      >
        {/* Removed Modern Calculator text */}
        <div className="mb-3 sm:mb-4 bg-gray-800 rounded-xl p-3 sm:p-4 text-right text-xl sm:text-2xl md:text-3xl font-mono min-h-[56px] flex items-center justify-end shadow-inner border border-gray-700 text-gray-100">
          {result !== null ? result : input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Button variant="destructive" size="lg" className="col-span-2 text-base sm:text-lg py-2 sm:py-3 rounded-xl shadow-md bg-red-700 text-white hover:bg-red-800 transition-all duration-150" onClick={handleClear}>
            C
          </Button>
          <Button variant="secondary" size="lg" className="col-span-2 text-base sm:text-lg py-2 sm:py-3 rounded-xl shadow-md bg-gray-700 text-gray-100 hover:bg-gray-600 transition-all duration-150" onClick={handleDelete}>
            DEL
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {buttons.flat().map((btn, i) => (
            btn === "=" ? (
              <Button
                key={btn + i}
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg col-span-1 hover:from-purple-600 hover:to-pink-600 text-base sm:text-lg py-2 sm:py-3"
                onClick={handleEqual}
              >
                =
              </Button>
            ) : (
              <Button
                key={btn + i}
                variant={/[0-9.]/.test(btn) ? "secondary" : "ghost"}
                size="lg"
                className={`font-bold col-span-1 text-base sm:text-lg py-2 sm:py-3 ${/[0-9.]/.test(btn) ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-purple-900 text-purple-300 hover:bg-purple-800 border border-purple-700"}`}
                onClick={() => handleClick(btn)}
              >
                  {btn === "/" ? "÷" : btn === "*" ? "×" : btn}
              </Button>
            )
          ))}
        </div>
        {/* History Tape */}
        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-purple-300 mb-2">History</h2>
            <ul className="bg-gray-800 rounded-xl p-3 text-sm sm:text-base max-h-40 overflow-y-auto border border-gray-700 text-gray-100">
              {history.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
                  <span className="text-gray-300 font-mono">{item.expr}</span>
                  <span className="text-purple-300 font-bold">{item.result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
