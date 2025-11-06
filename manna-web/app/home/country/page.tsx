"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  "South Korea",
  "Zimbabwe",
  "Chile",
];

export default function CountryPage() {
  // 초기에는 미선택 상태(null)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      {/* 모바일 프레임(375x812) 시뮬레이션 */}
      <div className="relative h-[812px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 공간 */}
        <div className="h-[44px]" />

        <div className="p-6 flex flex-col gap-10 pb-24">
          {/* Progress */}
          <div className="w-full h-2 rounded-[4px] bg-[#e8e9f1]">
            <div className="h-full bg-[#e86339] rounded-[8px] w-1/4" />
          </div>

          {/* 타이틀 */}
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-extrabold tracking-[0.24px] text-[#1f2024]">
              국적을 선택하세요
            </p>
            <p className="text-[14px] leading-5 text-[#71727a]">Enter your nationality.</p>
          </div>

          {/* 드롭다운 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="w-full h-12 border border-[#c5c6cc] rounded-[12px] px-4 flex items-center justify-between"
            >
              <span className={`text-[14px] ${value ? "text-[#1f2024]" : "text-[#8f9098]"}`}>
                {value ?? "Select a country"}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 9l6 6 6-6" stroke="#8f9098" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open ? (
              <div className="absolute left-[-3px] right-[-3px] top-[52px] bg-white rounded-[16px] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[#e8e9f1] z-10">
                {COUNTRIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setValue(c);
                      setOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-[12px] ${
                      c === value ? "bg-[#f8f9fe] text-[#1f2024]" : "bg-[#eeeff2] text-[#71727a]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <button
            type="button"
            disabled={!value}
            onClick={() => {
              if (!value) return;
              router.push("/home/fit");
            }}
            className={[
              "w-full h-12 rounded-[12px] flex items-center justify-center text-[12px] font-semibold",
              !value ? "bg-[#ec6439]/50 cursor-not-allowed" : "bg-[#ec6439] text-white",
            ].join(" ")}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}
