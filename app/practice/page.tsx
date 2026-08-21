"use client";
// import { count } from "console";

import { useEffect, useState } from "react";
export default function page() {
  const [first, setfirst] = useState(0);
 useEffect(() => {
   localStorage.setItem("count",first.toString())
 }, [first])
 
  return (
    <div className=" flex flex-col gap-10 justify-center items-center h-screen ">
      <h1 className="text-5xl">count:{first}</h1>
      <div className="flex gap-5">
        <button
          onClick={() => {
            setfirst(first + 1);
          }}
          className="bg-amber-300 text-black rounded-2xl px-2 py-3 text-2xl"
        >
          increase
        </button>
        <button
          onClick={() => {
            setfirst(first - 1);
          }}
          className="bg-amber-300 text-black rounded-2xl px-2 py-3 text-2xl"
        >
          decrease
        </button>
      </div>
    </div>
  );
}
