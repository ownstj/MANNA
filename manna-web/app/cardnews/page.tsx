"use client";

import Link from "next/link";
import { useMemo } from "react";

// Figma Dev Mode에서 제공된 원격 자산 URL들
const IMG_0 = "http://localhost:3845/assets/e5f7a4f3aea45c2fe9ef0dde35e2f655bbb31fde.png";
const IMG_1 = "http://localhost:3845/assets/0e4b2783b89814d7211de2ab6b4dcbbed764c74a.png";
const IMG_2 = "http://localhost:3845/assets/0a2d598227c3dbb46badecd19f21c22408ba3872.png";
const IMG_3 = "http://localhost:3845/assets/f1e46c0e7e0a292009e96ac98f5749754783b935.png";
const IMG_4 = "http://localhost:3845/assets/22762110bc28e4b65e268856cde32dccebcd5dfc.png";
const IMG_5 = "http://localhost:3845/assets/afb5649b5b0300513903deb3ffe8fb3f14962e3e.png";
// 아이콘(mask) 자산
const ICON_HOME = "http://localhost:3845/assets/6209feffe1d89cdd49757f671701f551747c6518.svg"; // tab1
const ICON_CARD = "http://localhost:3845/assets/54822667ab4776d00e49f7241d344fd4b0a846e3.svg"; // tab2 active
const ICON_SCAN = "http://localhost:3845/assets/8fa550181d96ef4c916506c5327c11f6a10cabe5.svg"; // tab3
const ICON_CHALLENGE = "http://localhost:3845/assets/0490fb8ac453988b7a96965737c1192af6f7e867.svg"; // tab4
const ICON_PROFILE = "http://localhost:3845/assets/17ab68075ea05e50e0c268957afbf0c7f1cd7199.svg"; // tab5
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

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-[#1f2024] md:rounded-2xl md:shadow-md overflow-hidden" data-node-id="1312:5000" data-name="Search results">
        {/* iOS Status Bar */}
        <div className="absolute left-0 right-0 top-[-2px] h-[44px] backdrop-blur-[20px] bg-white/100" />

        {/* Nav Bar */}
        <div className="absolute top-[46px] left-0 w-[375px] h-[40px] bg-white">
          <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#1f2024]">카드 뉴스</p>
          <Link href="/main" aria-label="뒤로" className="absolute left-[24px] top-1/2 -translate-y-1/2 size-5 rounded-full flex items-center justify-center">
            <MaskIcon src={ICON_ARROW_LEFT} color={COLOR_ACCENT} size={20} />
          </Link>
        </div>

        {/* 정렬/필터 칩 바 */}
        <div className="absolute left-0 right-0 top-[73px] px-4 flex items-center justify-between">
          <button type="button" className="h-9 px-3 rounded-[12px] border border-[#c5c6cc] flex items-center gap-3">
            <span className="flex items-center gap-2">
              <MaskIcon src={ICON_FILTER} size={12} color="#8f9098" />
              <span className="text-[12px] tracking-[0.12px] text-[#1f2024]">정렬</span>
            </span>
            <MaskIcon src={ICON_CHEVRON_DOWN} size={10} color={COLOR_ACCENT} />
          </button>

          <button type="button" className="h-9 px-3 rounded-[12px] border border-[#c5c6cc] flex items-center gap-3">
            <span className="flex items-center gap-2">
              <MaskIcon src={ICON_FILTER} size={12} color={COLOR_ACCENT} />
              <span className="text-[12px] tracking-[0.12px] text-[#1f2024]">필터</span>
            </span>
            <span className="size-5 rounded-[20px] bg-[color:var(--accent,#e86339)] text-white text-[10px] font-semibold flex items-center justify-center">2</span>
          </button>
        </div>

        {/* 콘텐츠 그리드 */}
        <div className="absolute left-0 right-0 top-[125px] bottom-[80px] px-4 pb-4 overflow-auto">
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

        {/* 하단 탭 바 */}
        <div className="absolute left-0 right-0 bottom-0 h-[80px] px-4 pb-8 pt-4 bg-white flex gap-1">
          {[
            { label: "홈", icon: ICON_HOME, href: "/main", active: false },
            { label: "카드뉴스", icon: ICON_CARD, href: "/cardnews", active: true },
            { label: "스캔", icon: ICON_SCAN, href: "#", active: false },
            { label: "챌린지", icon: ICON_CHALLENGE, href: "#", active: false },
            { label: "내 프로필", icon: ICON_PROFILE, href: "#", active: false },
          ].map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="flex-1 flex flex-col items-center gap-2"
              aria-current={t.active ? "page" : undefined}
            >
              <MaskIcon src={t.icon} size={20} color={t.active ? COLOR_ACCENT : COLOR_ICON_INACTIVE} />
              <span className={`${t.active ? "text-[#1f2024]" : "text-[#71727a]"} text-[10px] leading-[14px] ${t.active ? "font-normal" : "font-normal"}`}>{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
