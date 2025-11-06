"use client";

import { useState } from "react";

const OPTIONS = [
  { key: "vegan", label: "비건" },
  { key: "fruitarian", label: "프루테리언" },
  { key: "lacto", label: "락토 베지테리언" },
  { key: "ovo", label: "오보 베지테리언" },
  { key: "lacto_ovo", label: "락토-오보-베지테리언" },
  { key: "pesco", label: "페스코 베지테리언" },
  { key: "pollo", label: "폴로 베지테리언" },
  { key: "flexi", label: "플렉시테리언" },
];

export default function VegetarianPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 */}
        <div className="h-[44px]" />

        <div className="absolute left-0 right-0 top-[43.88px] p-6 flex flex-col gap-10">
          {/* Progress bar (약 75%) */}
          <div className="w-full h-2 rounded-[4px] bg-[#e8e9f1]">
            <div className="h-full bg-[#e86339] rounded-[8px] w-3/4" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-extrabold tracking-[0.24px] text-[#1f2024]">채식의 정도를 선택하세요</p>
            <p className="text-[14px] leading-5 text-[#71727a]">What’s your vegetarian type?</p>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2">
            {OPTIONS.map(({ key, label }) => {
              const isSelected = selected === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  className={[
                    "w-full rounded-[12px] p-4 flex items-center gap-4 text-left outline-none transition-colors border border-[#c5c6cc]",
                    isSelected ? "bg-[#fff4e4]" : "",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  <span className="flex-1 text-[14px] text-[#1f2024] leading-5">{label}</span>
                  {isSelected ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M8 5l7 7-7 7" stroke="#E86339" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer button */}
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <button
            type="button"
            disabled={!selected}
            onClick={() => {
              if (!selected) return;
              window.location.href = "/home/allergy";
            }}
            className={[
              "w-full h-12 rounded-[12px] flex items-center justify-center text-[12px] font-semibold",
              !selected ? "bg-[#ec6439]/50 cursor-not-allowed" : "bg-[#ec6439] text-white",
            ].join(" ")}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}
