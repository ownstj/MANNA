"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  const handleClick = useCallback((label: string) => {
    if (label === "카드뉴스") router.push("/cardnews");
    // 다른 탭은 향후 라우팅 추가 가능
  }, [router]);

  // 로컬 이미지 경로만 사용 (폴백 제거)
  const FEED_IMG = "/assets/main/feed.png";
  const THUMBS = [
    "/assets/main/thumb1.png",
    "/assets/main/thumb2.png",
    "/assets/main/thumb3.png",
    null,
  ] as const;

  // 탭 아이콘 (로컬만 사용)
  const ICONS = {
    home: "/assets/icons/home.svg",
    card: "/assets/icons/card.svg",
    scan: "/assets/icons/scan.svg",
    challenge: "/assets/icons/challenge.svg",
    profile: "/assets/icons/profile.svg",
  } as const;

  // 아이콘 컴포넌트: CSS mask로 색상 적용
  const Icon = ({ src, color = "#d4d6dd", size = 20 }: { src: string; color?: string; size?: number }) => (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        display: "inline-block",
        backgroundColor: color,
        WebkitMaskImage: `url('${src}')`,
        maskImage: `url('${src}')`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      {/* 모바일 프레임 */}
      <div className="relative h-[818px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 공간 */}
        <div className="h-[44px]" />

        {/* 헤더: 검색바 */}
        <div className="px-6 pt-[10px] pb-4">
          <div className="w-full h-11 bg-[#f8f9fe] rounded-[24px] px-4 flex items-center gap-4">
            {/* 검색 아이콘 */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="#2F3036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[14px] leading-5 text-[#8f9098]">오늘은 어떤 음식을 드실래요?</span>
          </div>
        </div>

        {/* 홈 피드 이미지 (로컬만 사용, 없으면 플레이스홀더) */}
        <div className="px-8">
          <div className="h-[406px] w-full rounded-[15px] overflow-hidden bg-[#e8e9f1] flex items-center justify-center">
            {/* 이미지 엘리먼트는 항상 시도하되, 404 시 브라우저가 표시하지 않음 */}
            <img src={FEED_IMG} alt="홈 피드" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget.style.display = 'none'); }} />
            {/* 로컬 이미지 부재 시 별도 문구 제거 (디자이너 요청) */}
          </div>
        </div>

        {/* 추천 텍스트 오버레이 */}
        <div className="absolute left-8 right-8 top-[401px]">
          <div className="rounded-b-[15px] h-[132px] bg-gradient-to-b from-[#d9d9d9]/80 to-[#737373]/80 px-[22px] py-3">
            <p className="text-[14px] text-white/90">오늘의 추천</p>
            <p className="text-[16px] font-extrabold tracking-[0.08px] text-white mt-1">순두부 찌개 어때요?</p>
            <p className="text-[14px] text-white/90 mt-0.5">맵기 3/5 - 돼지고기, 두부, 파</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="h-10 rounded-[12px] border border-[#e86339] bg-[#e86339] text-[12px] font-semibold text-white">다른 음식 보기</button>
              <button className="h-10 rounded-[12px] bg-[#e86339] text-[12px] font-semibold text-white">AI 설명 보기</button>
            </div>
          </div>
        </div>

        {/* 카드뉴스(스캔 기록) */}
        <div className="absolute left-0 right-0 top-[577px] px-0">
          <div className="px-[33px] flex items-center justify-between">
            <p className="text-[12px] font-bold">스캔 기록</p>
            <p className="text-[10px] text-[#71727a] tracking-[0.15px]">모두 보기</p>
          </div>
          <div className="mt-2 px-[33px] flex gap-[9px]">
            {THUMBS.map((src, i) => (
              <div key={i} className="size-[72px] rounded-[8px] overflow-hidden bg-[#e8e9f1] flex items-center justify-center">
                {src ? (
                  <img src={src} alt={`스캔 썸네일 ${i + 1}`} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget.style.display = 'none'); }} />
                ) : null}
                {/* 썸네일 아래 파일명 표시 제거 (디자이너 요청) */}
              </div>
            ))}
          </div>
        </div>

        {/* 탭 바 */}
        <div className="absolute left-0 right-0 bottom-0 h-[88px] px-4 pt-4 pb-8 bg-white flex gap-1">
          {[
            { label: "홈", icon: ICONS.home, active: true },
            { label: "카드뉴스", icon: ICONS.card },
            { label: "스캔", icon: ICONS.scan },
            { label: "챌린지", icon: ICONS.challenge },
            { label: "내 프로필", icon: ICONS.profile },
          ].map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => handleClick(t.label)}
              className="flex-1 flex flex-col items-center gap-2"
              aria-pressed={!!t.active}
            >
              <Icon src={t.icon} color={t.active ? "#e86339" : "#d4d6dd"} size={20} />
              <p className={`${t.active ? "text-[#1f2024] font-semibold" : "text-[#71727a]"} text-[10px] leading-[14px]`}>{t.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
