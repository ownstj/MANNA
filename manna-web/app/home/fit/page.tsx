"use client";

import { useState } from "react";

const OPTIONS = [
  { key: "vegan", label: "채식주의자" },
  { key: "allergy", label: "알레르기를 가지고 있음" },
  { key: "religion", label: "종교적 이유로 못먹는 음식이 있음 (하람)" },
  { key: "none", label: "선택사항 없음" },
];

export default function FitPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (key === "none") {
        // '선택사항 없음'은 배타적 - 단독 선택
        if (next.has("none")) {
          next.delete("none");
        } else {
          next.clear();
          next.add("none");
        }
        return next;
      }
      // 일반 옵션 토글 시 'none' 해제
      next.delete("none");
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const hasSelection = selected.size > 0;

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 */}
        <div className="h-[44px]" />

        <div className="absolute left-0 right-0 top-[43.88px] p-6 flex flex-col gap-10">
          {/* Progress bar */}
          <div className="w-full h-2 rounded-[4px] bg-[#e8e9f1]">
            <div className="h-full bg-[#e86339] rounded-[8px] w-1/2" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-extrabold tracking-[0.24px] text-[#1f2024]">어떤 사항에 해당하나요?</p>
            <p className="text-[14px] leading-5 text-[#71727a]">Which one fits to you? Choose freely.</p>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2">
            {OPTIONS.map(({ key, label }) => {
              const isNone = key === "none";
              const isSelected = selected.has(key);
              // 모든 항목에 기본 테두리 적용, 일반 항목이 선택되면 배경만 추가
              const base = "border border-[#c5c6cc]";
              const selectedBg = !isNone && isSelected ? "bg-[#fff4e4]" : "";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(key)}
                  className={[
                    "w-full rounded-[12px] p-4 flex items-center gap-4 text-left outline-none transition-colors",
                    base,
                    selectedBg,
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  <span className="flex-1 text-[14px] text-[#1f2024] leading-5">{label}</span>
                  {!isNone && isSelected ? (
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
            disabled={!hasSelection}
            onClick={() => {
              if (!hasSelection) return;
              window.location.href = "/home/religion";
            }}
            className={[
              "w-full h-12 rounded-[12px] flex items-center justify-center text-[12px] font-semibold",
              !hasSelection ? "bg-[#ec6439]/50 cursor-not-allowed" : "bg-[#ec6439] text-white",
            ].join(" ")}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}
