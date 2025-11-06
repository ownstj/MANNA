"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

// Figma Dev Mode에서 제공된 원격 자산 URL들
const IMG_0 = "/assets/main/cardNews/IMG_0.png";
const IMG_1 = "/assets/main/cardNews/IMG_1.jpg";
const IMG_2 = "/assets/main/cardNews/IMG_2.jpg";
const IMG_3 = "/assets/main/cardNews/IMG_3.jpg";
const IMG_4 = "/assets/main/cardNews/IMG_4.jpg";
const IMG_5 = "/assets/main/cardNews/IMG_5.jpg";
// 아이콘(mask) 자산
const ICON_FILTER = "http://localhost:3845/assets/253ec4b055a758c6843164f6d892de0485c3c54e.svg"; // filter icon (chip)
const ICON_CHEVRON_DOWN = "http://localhost:3845/assets/1f9380475efa3247311548d62ca7fe3e9c0b3eca.svg"; // tiny chevron down
const ICON_ARROW_LEFT = "http://localhost:3845/assets/7843c96e9d2f6877d77cee31393aecfb5a416fc8.svg"; // back arrow

// 사용되는 색상 토큰만 유지
const COLOR_ACCENT = "#E86339"; // Highlight/Darkest
const COLOR_ICON_INACTIVE = "#D4D6DD"; // Neutral/Light/Dark

// mask 기반 아이콘 공통 컴포넌트
function MaskIcon({ src, size = 20, color = COLOR_ICON_INACTIVE, className = "" }: { src: string; size?: number; color?: string; className?: string }) {
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

// 로컬 탭 아이콘 (HOME 페이지와 동일 자산 사용)
const ICONS = {
  home: "/assets/icons/home.svg",
  card: "/assets/icons/card.svg",
  scan: "/assets/icons/scan.svg",
  challenge: "/assets/icons/challenge.svg",
  profile: "/assets/icons/profile.svg",
} as const;

export default function CardNewsPage() {
  const cards = useMemo(
    () => [
      {
        id: 1,
        img: IMG_0,
        kicker: "레몬 아이스티에 샷 추가",
        title1: "색다른 음료가 ",
        title2: "마시고 싶은 날에는?",
      },
      {
        id: 2,
        img: IMG_1,
        kicker: "연어 깍두기",
        title1: "알레스카 곰도",
        title2: "이정도는 안 먹어요",
      },
      {
        id: 3,
        img: IMG_2,
        kicker: "말차튀소",
        title1: "드디어 떴다!",
        title2: "성심당 말차튀소",
      },
      {
        id: 4,
        img: IMG_3,
        kicker: "육회+칼빔면",
        title1: "칼국수, 육회, 나",
        title2: "셋의 만남 너무 기쁘다",
      },
      {
        id: 5,
        img: IMG_4,
        kicker: "훠궈",
        title1: "하이디라오에서 맛보는 정통 훠궈의 맛",
        title2: "",
      },
      {
        id: 6,
        img: IMG_5,
        kicker: "아귀찜",
        title1:
          "여기서 끝이 아니다~~ 아귀콩나물미나리대파미더덕다시마참기름까지들어간 아귀찜!",
        title2: "",
      },
    ],
    []
  );

  const router = useRouter();
  const handleTabClick = (label: string) => {
    if (label === "홈") router.push("/main");
    if (label === "카드뉴스") router.push("/cardnews");
    if (label === "챌린지") router.push("/challenge");
    // TODO: 스캔/챌린지/내 프로필 라우팅은 필요 시 추가
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-[#1f2024] md:rounded-2xl md:shadow-md overflow-hidden" data-node-id="1312:5000" data-name="Search results">
        <div className="flex flex-col h-full">
          {/* 상단 영역: 네비만 고정 */}
          <div className="shrink-0">
            {/* Nav Bar - 최상단 고정 */}
            <div className="h-[40px] bg-white sticky top-0 z-10">
              <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#1f2024]">카드 뉴스</p>
              <Link href="/main" aria-label="뒤로" className="absolute left-[24px] top-1/2 -translate-y-1/2 size-5 rounded-full flex items-center justify-center">
                <MaskIcon src={ICON_ARROW_LEFT} color={COLOR_ACCENT} size={20} />
              </Link>
            </div>
          </div>

          {/* 본문: 칩 바 + 카드 그리드 (스크롤 영역) */}
          <div className="flex-1 overflow-auto px-4 pt-3 pb-[120px]">
            {/* 정렬/필터 칩 바 (스크롤됨) */}
            <div className="mb-3 flex items-center justify-between h-[36px]">
              <button type="button" className="h-[36px] px-3 rounded-[12px] border border-[#c5c6cc] flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <MaskIcon src={ICON_FILTER} size={12} color="#8f9098" />
                  <span className="text-[12px] tracking-[0.12px] text-[#1f2024]">정렬</span>
                </span>
                <MaskIcon src={ICON_CHEVRON_DOWN} size={10} color={COLOR_ACCENT} />
              </button>

              <button type="button" className="h-[36px] px-3 rounded-[12px] border border-[#c5c6cc] flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <MaskIcon src={ICON_FILTER} size={12} color={COLOR_ACCENT} />
                  <span className="text-[12px] tracking-[0.12px] text-[#1f2024]">필터</span>
                </span>
                <span className="size-5 rounded-[20px] bg-[color:var(--accent,#e86339)] text-white text-[10px] font-semibold flex items-center justify-center">2</span>
              </button>
            </div>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-2 gap-3">
              {cards.map((c) => (
                <Link key={c.id} href={`/cardnews/${c.id}`} className="bg-[#f8f9fe] rounded-[16px] overflow-hidden flex flex-col">
                  <div className="h-[120px] w-full bg-[#f8f9fe] overflow-hidden">
                    {/* 원격 이미지가 보이지 않을 가능성 대비 onError로 숨김 */}
                    <img src={c.img} alt="썸네일" className="w-full h-full object-cover" onError={(e) => {
                      (e.currentTarget.style.display = "none");
                    }} />
                  </div>
                  <div className="p-4">
                    <div className="text-[#1f2024]">
                      {c.kicker && (
                        <p className="text-[12px] leading-[16px] tracking-[0.12px]">{c.kicker}</p>
                      )}
                      <div className="mt-1 text-[14px] font-bold space-y-0.5">
                        {c.title1 && <p>{c.title1}</p>}
                        {c.title2 && <p>{c.title2}</p>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 탭 바 - HOME 페이지 스타일로 절대 배치 */}
        <div className="absolute left-0 right-0 bottom-0 h-[88px] px-4 pt-4 pb-8 bg-white flex gap-1">
          {[
            { label: "홈", icon: ICONS.home, active: false },
            { label: "카드뉴스", icon: ICONS.card, active: true },
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
              <MaskIcon src={t.icon} color={t.active ? COLOR_ACCENT : COLOR_ICON_INACTIVE} size={20} />
              <p className={`${t.active ? "text-[#1f2024] font-semibold" : "text-[#71727a]"} text-[10px] leading-[14px]`}>{t.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
