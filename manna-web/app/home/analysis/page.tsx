"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// 간단 마스크 아이콘 유틸 (cardnews 페이지와 동일 스타일)
function MaskIcon({ src, size = 20, color = "#D4D6DD", className = "" }: { src: string; size?: number; color?: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={className}
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
}

const ICONS = {
  home: "/assets/icons/home.svg",
  card: "/assets/icons/card.svg",
  scan: "/assets/icons/scan.svg",
  challenge: "/assets/icons/challenge.svg",
  profile: "/assets/icons/profile.svg",
  back: "http://localhost:3845/assets/7843c96e9d2f6877d77cee31393aecfb5a416fc8.svg",
} as const;

export default function AnalysisResultPage() {
  const router = useRouter();

  const handleTabClick = (label: string) => {
    if (label === "홈") router.push("/main");
    if (label === "카드뉴스") router.push("/cardnews");
    if (label === "챌린지") router.push("/challenge");
    // 스캔은 바텀시트를 카드뉴스에서 처리하므로 여기서는 카드뉴스로 유도
    if (label === "스캔") router.push("/cardnews");
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-[#1f2024] md:rounded-2xl md:shadow-md overflow-hidden" data-name="Scan Result">
        {/* 헤더 - 상단 고정 */}
        <div className="h-[44px] bg-white sticky top-0 z-10">
          <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[14px] font-bold">분석 결과</p>
          <Link href="/cardnews" aria-label="뒤로" className="absolute left-[16px] top-1/2 -translate-y-1/2 size-6 flex items-center justify-center">
            <MaskIcon src={ICONS.back} size={20} color="#E86339" />
          </Link>
        </div>

        {/* 콘텐츠 */}
        <div className="h-full overflow-auto pb-[120px]">
          {/* 상단 썸네일/배너 영역 */}
          <div className="relative w-full h-[220px] bg-[#E9F2FF]">
            {/* 업로드 이미지가 있다면 쿼리/상태로 치환 가능. 현재는 플레이스홀더 박스 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[#3b82f6] text-[12px]">분석된 이미지 영역</p>
            </div>
          </div>

          {/* 본문 카드들 */}
          <div className="px-16 py-6 space-y-6">
            {/* 요약 카드 */}
            <div className="rounded-2xl border border-[#E0E2E7] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#71727a]">스캔 요약</p>
                <span className="text-[10px] text-[#8f9098]">7/10 적합</span>
              </div>
              <div className="space-y-1">
                <p className="text-[16px] font-bold">분석된 제품명(예시)</p>
                <p className="text-[12px] text-[#71727a]">카테고리 • 브랜드 • 기타</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {["비건", "돼지고기 미포함", "난류 포함"].map((chip) => (
                  <span key={chip} className="px-2 h-6 rounded-full bg-[#f5f6fa] text-[10px] text-[#3b3b44] inline-flex items-center">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="rounded-2xl border border-[#E0E2E7] p-4 space-y-4">
              <p className="text-[12px] font-semibold text-[#71727a]">상세 정보</p>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div className="space-y-1">
                  <p className="text-[#8f9098]">칼로리</p>
                  <p className="font-semibold text-[#1f2024]">240 kcal</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#8f9098]">당류</p>
                  <p className="font-semibold text-[#1f2024]">18 g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#8f9098]">단백질</p>
                  <p className="font-semibold text-[#1f2024]">6 g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#8f9098]">지방</p>
                  <p className="font-semibold text-[#1f2024]">9 g</p>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => router.push("/cardnews")} className="h-11 rounded-xl border border-[#E0E2E7] text-[12px] font-semibold">다시 스캔</button>
              <button type="button" className="h-11 rounded-xl bg-[#E86339] text-white text-[12px] font-semibold">공유하기</button>
            </div>
          </div>
        </div>

        {/* 하단 탭 바 */}
        <div className="absolute left-0 right-0 bottom-0 h-[88px] px-4 pt-4 pb-8 bg-white flex gap-1">
          {[
            { label: "홈", icon: ICONS.home, active: false },
            { label: "카드뉴스", icon: ICONS.card, active: false },
            { label: "스캔", icon: ICONS.scan, active: false },
            { label: "챌린지", icon: ICONS.challenge, active: false },
            { label: "내 프로필", icon: ICONS.profile, active: false },
          ].map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => handleTabClick(t.label)}
              className="flex-1 flex flex-col items-center gap-2"
              aria-pressed={t.active}
            >
              <MaskIcon src={t.icon} color={t.active ? "#E86339" : "#D4D6DD"} size={20} />
              <p className={`${t.active ? "text-[#1f2024] font-semibold" : "text-[#71727a]"} text-[10px] leading-[14px]`}>{t.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

