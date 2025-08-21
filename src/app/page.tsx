
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-2">
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl border border-gray-200 p-4 sm:p-8 flex flex-col justify-center"
        style={{ minHeight: '420px' }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-purple-600 tracking-tight">Modern Calculator</h1>
        <div className="mb-3 sm:mb-4 bg-gray-100 rounded-xl p-3 sm:p-4 text-right text-xl sm:text-2xl md:text-3xl font-mono min-h-[56px] flex items-center justify-end shadow-inner border border-gray-200">
          {result !== null ? result : input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Button variant="destructive" size="lg" className="col-span-2 text-base sm:text-lg py-2 sm:py-3" onClick={handleClear}>
            C
          </Button>
          <Button variant="secondary" size="lg" className="text-base sm:text-lg py-2 sm:py-3" onClick={handleDelete}>
            DEL
          </Button>
          <Button variant="ghost" size="lg" className="text-base sm:text-lg py-2 sm:py-3" onClick={() => handleClick("/")}>
            ÷
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
                className={`font-bold col-span-1 text-base sm:text-lg py-2 sm:py-3 ${/[0-9.]/.test(btn) ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-purple-100 text-purple-600 hover:bg-purple-200"}`}
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
            <h2 className="text-lg font-semibold text-purple-700 mb-2">History</h2>
            <ul className="bg-gray-50 rounded-xl p-3 text-sm sm:text-base max-h-40 overflow-y-auto border border-gray-200">
              {history.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600 font-mono">{item.expr}</span>
                  <span className="text-purple-600 font-bold">{item.result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
