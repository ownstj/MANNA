"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  { key: "milk", label: "우유 알레르기" },
  { key: "egg", label: "계란 알레르기" },
  { key: "soy", label: "콩 알레르기" },
  { key: "crab", label: "게 알레르기" },
  { key: "shrimp", label: "새우 알레르기" },
  { key: "shellfish", label: "조개류 알레르기" },
  { key: "peanut", label: "땅콩 알레르기" },
  { key: "almond", label: "아몬드 알레르기" },
];

export default function AllergyPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = useCallback((key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const hasSelection = selected.size > 0;

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 */}
        <div className="h-[44px]" />

        <div className="absolute left-0 right-0 top-[43.88px] p-6 flex flex-col gap-6">
          {/* top-right 시작하기 버튼 (Figma와 동일) */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-[14px] font-medium text-[#71727a] hover:underline"
            >
              시작하기
            </button>
          </div>

          {/* Progress bar (끝까지 진행) */}
          <div className="w-full h-2 rounded-[4px] bg-[#e8e9f1]">
            <div className="h-full bg-[#e86339] rounded-[8px] w-full" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-extrabold tracking-[0.24px] text-[#1f2024]">어떤 알레르기가 있나요?</p>
            <p className="text-[14px] leading-5 text-[#71727a]">Which allergy do you have?</p>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2">
            {OPTIONS.map(({ key, label }) => {
              const isSelected = selected.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(key)}
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
            disabled={!hasSelection}
            onClick={() => {
              if (!hasSelection) return;
              router.push("/home/start");
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
