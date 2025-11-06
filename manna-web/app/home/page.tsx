"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Language = {
  label: string;
};

const LANGUAGES: Language[] = [
  { label: "Korean (한국어)" },
  { label: "English (English)" },
  { label: "Spanish (español)" },
  { label: "Chinese (中文)" },
  { label: "Vietnam (Tiếng Việt)" },
  { label: "Japanese (日本語）" },
];

export default function HomePage() {
  const [selected, setSelected] = useState<number | null>(0);
  const router = useRouter();

  const onNext = () => {
    if (selected == null) return;
    router.push("/home/country");
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      {/* 모바일 프레임(375x812) 시뮬레이션 */}
      <div className="relative h-[812px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 공간 */}
        <div className="h-[44px]" />

        {/* 상단 컨텐츠 */}
        <div className="p-6 flex flex-col gap-10">
          {/* Progress */}
          <div className="w-full h-2 rounded-[4px] bg-[#e8e9f1]" />

          {/* 타이틀/설명 */}
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-extrabold tracking-[0.24px] text-[#1f2024]">
              언어를 설정하세요
            </p>
            <p className="text-[14px] leading-5 text-[#71727a]">Choose your language.</p>
          </div>

          {/* 리스트 */}
          <div className="flex flex-col gap-2">
            {LANGUAGES.map((item, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelected(idx)}
                  className={[
                    "w-full rounded-[12px] p-4 flex items-center gap-4 text-left outline-none transition-colors",
                    isSelected
                      ? "bg-[#fff4e4]"
                      : "border border-solid border-[#c5c6cc]",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  <span className="flex-1 text-[14px] text-[#1f2024] leading-5">
                    {item.label}
                  </span>
                  {/* 선택 표시 화살표 */}
                  {isSelected ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M8 5l7 7-7 7"
                        stroke="#E86339"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <button
            type="button"
            onClick={onNext}
            disabled={selected == null}
            className={[
              "w-full h-12 rounded-[12px] flex items-center justify-center text-[12px] font-semibold",
              selected == null ? "bg-[#ec6439]/50 cursor-not-allowed" : "bg-[#ec6439] text-white",
            ].join(" ")}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}
