"use client";

import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      {/* 모바일 프레임 */}
      <div className="relative h-[812px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 공간 */}
        <div className="h-[44px]" />

        {/* 본문 */}
        <div className="p-6 flex flex-col items-center text-center gap-8">
          {/* 상단 일러스트/아이콘 */}
          <div className="mt-10 size-24 rounded-full bg-[#fff4e4] flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 12l2 2 4-4" stroke="#E86339" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" stroke="#E86339" strokeWidth="2" />
            </svg>
          </div>

          {/* 타이틀/설명 */}
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-extrabold tracking-[0.24px] text-[#1f2024]">설정이 완료되었어요</p>
            <p className="text-[14px] leading-5 text-[#71727a]">맞춤 정보를 바탕으로 추천을 준비했어요.</p>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <button
            type="button"
            onClick={() => router.push("/main")}
            className="w-full h-12 rounded-[12px] flex items-center justify-center text-[12px] font-semibold bg-[#ec6439] text-white"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

