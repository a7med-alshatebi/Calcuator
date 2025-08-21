
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

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
    } catch {
      setResult("Error");
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "+", "="]
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 w-full max-w-xs border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-600 tracking-tight">Beautiful Calculator</h1>
        <div className="mb-4 bg-gray-100 rounded-xl p-4 text-right text-2xl font-mono min-h-[56px] flex items-center justify-end shadow-inner border border-gray-200">
          {result !== null ? result : input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <Button variant="destructive" size="lg" className="col-span-2" onClick={handleClear}>
            C
          </Button>
          <Button variant="secondary" size="lg" onClick={handleDelete}>
            DEL
          </Button>
          <Button variant="ghost" size="lg" onClick={() => handleClick("/")}>
            ÷
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn, i) => (
            btn === "=" ? (
              <Button
                key={btn + i}
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg col-span-1 hover:from-purple-600 hover:to-pink-600"
                onClick={handleEqual}
              >
                =
              </Button>
            ) : (
              <Button
                key={btn + i}
                variant={/[0-9.]/.test(btn) ? "secondary" : "ghost"}
                size="lg"
                className={`font-bold col-span-1 ${/[0-9.]/.test(btn) ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-purple-100 text-purple-600 hover:bg-purple-200"}`}
                onClick={() => handleClick(btn)}
              >
                {btn === "/" ? "÷" : btn === "*" ? "×" : btn}
              </Button>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
