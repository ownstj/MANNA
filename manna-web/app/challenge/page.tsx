"use client";

import Link from "next/link";

// Figma Dev Mode assets
const IMG_RECT_BG = "http://localhost:3845/assets/ea8265d6a6791c492a522ef4477143ffd8df9b30.svg";
const IMG_HERO_RIGHT = "http://localhost:3845/assets/dd911b33da5cba4f552455351c0a49573e8f7b32.png";
const IMG_RANK_GROUP = "http://localhost:3845/assets/44c0d7634dba6650b46468e64c9443119558b98c.png";
const IMG_MAN = "http://localhost:3845/assets/2027bb73453e427fbe86218e54b123f6f5ea491f.png";
const ICON_ARROW_LEFT = "http://localhost:3845/assets/7843c96e9d2f6877d77cee31393aecfb5a416fc8.svg";
const IMG_POLYGON = "http://localhost:3845/assets/9b6bb7b333d9664efaabe0eed6275fa41191f5f9.svg";
const STEP_BG_CURRENT = "http://localhost:3845/assets/1917cd8687ac3b283aa32fca1d9a24385db20ea2.svg";
const STEP_BG_NOT_DONE = "http://localhost:3845/assets/c41c7f3abada84522c5c5e3eeb448cbdf3c6c758.svg";

const COLOR_ACCENT = "#E86339";
const COLOR_ICON_INACTIVE = "#D4D6DD";

// local tab icons
const ICONS = {
  home: "/assets/icons/home.svg",
  card: "/assets/icons/card.svg",
  scan: "/assets/icons/scan.svg",
  challenge: "/assets/icons/challenge.svg",
  profile: "/assets/icons/profile.svg",
} as const;

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

// 간단한 스텝퍼(1..total) 원형 인디케이터 구현
function Stepper({ total = 5, current = 1, className = "" }: { total?: number; current?: number; className?: string }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className={`inline-flex items-center gap-[10px] ${className}`}>
      {steps.map((idx) => (
        <div key={idx} className="relative w-[24px] h-[24px] shrink-0">
          <img src={idx === current ? STEP_BG_CURRENT : STEP_BG_NOT_DONE} alt={`step-${idx}`} className="w-full h-full" />
          <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold ${idx === current ? "text-white" : "text-[#8f9098]"} tracking-[0.5px]`}>{idx}</span>
        </div>
      ))}
    </div>
  );
}

export default function ChallengePage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-[#1f2024] md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 */}
        <div className="absolute left-0 right-0 top-0 h-[44px] bg-white" />

        {/* 상단 Nav Bar (Figma 기준 44px 아래) */}
        <div className="absolute left-0 right-0 top-[44px] h-[56px] bg-white">
          <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[14px] font-bold">탐색 탭</p>
          <Link href="/main" aria-label="뒤로" className="absolute left-[24px] top-1/2 -translate-y-1/2 size-5 flex items-center justify-center">
            <MaskIcon src={ICON_ARROW_LEFT} color={COLOR_ACCENT} size={20} />
          </Link>
        </div>

        {/* 메인 콘텐츠 절대 배치 (Figma 좌표) */}
        {/* 배경 사각형 */}
        <div className="absolute left-[21px] top-[63px] w-[329px] h-[489px]">
          <img src={IMG_RECT_BG} alt="배경" className="w-full h-full object-contain" />
        </div>

        {/* 노란 하이라이트 바 */}
        <div className="absolute left-[36px] top-[94px] w-[158px] h-[13px] bg-[#fbea2a]" />

        {/* 메뉴판 흰 박스 */}
        <div className="absolute left-[31px] top-[141px] w-[309px] h-[228px] bg-white rounded-[16px]" />

        {/* 타이틀/진행도/설명 */}
        <p className="absolute left-[36px] top-[78px] text-[24px] font-bold text-black">나의 챌린지 현황</p>
        <p className="absolute left-[194px] top-[91px] text-[13px] text-black">(7/ 10)</p>
        <p className="absolute left-[39px] top-[113px] text-[10px] text-black">한국 음식에 대한 두려움을 한번에 해결해 보세요!</p>

        {/* 스텝퍼 1: 원형 배경 + 타이틀 (좌표 보정) */}
        <div className="absolute left-[35px] top-[158px] flex items-center gap-[12px]">
          <div className="relative w-[24px] h-[24px]">
            <img src={STEP_BG_CURRENT} alt="1단계" className="w-full h-full" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold text-white tracking-[0.5px]">1</span>
          </div>
          <p className="text-[12px] font-bold text-[#1f2024]">한국 매운맛 챌린지</p>
        </div>
        {/* 스텝퍼 원형 인디케이터 (제목 하단) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[188px]">
          <Stepper total={5} current={1} />
        </div>
        {/* 진행 바는 Figma 레이어 상 존재하지 않아 제거 */}

        {/* 스텝퍼 2: 원형 배경 + 타이틀 (좌표/텍스트 보정) */}
        <div className="absolute left-[32px] top-[263px] flex items-center gap-[12px]">
          <div className="relative w-[24px] h-[24px]">
            <img src={STEP_BG_NOT_DONE} alt="2단계" className="w-full h-full" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#8f9098] tracking-[0.5px]">2</span>
          </div>
          <p className="text-[12px] font-bold text-[#8f9098]">한국 전통음식 챌린지</p>
        </div>
        {/* 스텝퍼 원형 인디케이터 (제목 하단) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[293px]">
          <Stepper total={5} current={0} />
        </div>
        {/* 진행 바는 Figma 레이어 상 존재하지 않아 제거 */}

        {/* 페이지네이션 점 */}
        <div className="absolute left-[143px] top-[351px] flex items-center justify-center gap-[8px]">
          <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
          <span className="size-2 rounded-full bg-[#e86339]" />
          <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
          <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
          <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
        </div>

        {/* 우측 이미지 */}
        <div className="absolute left-[179px] top-[378px] w-[191px] h-[153px] overflow-hidden rounded-[16px]">
          <img src={IMG_HERO_RIGHT} alt="챌린지 이미지" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget.style.display = 'none'); }} />
        </div>

        {/* 툴팁 */}
        <div className="absolute left-[39px] top-[404px] w-[191px] h-[111px]">
          <div className="bg-[#2f3036] rounded-[16px] p-[20px] text-white">
            <p className="text-[12px] font-bold">Tip</p>
            <p className="text-[10px] leading-[14px] tracking-[0.15px] text-[#d4d6dd] mt-2">Description. Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do</p>
          </div>
        </div>
        {/* 툴팁 삼각형 */}
        <div className="absolute left-[225px] top-[417px] w-[19px] h-[17px] rotate-90">
          <img src={IMG_POLYGON} alt="pointer" className="w-full h-full" />
        </div>

        {/* 하단 카드: 랭크/친구 */}
        <div className="absolute left-[21px] top-[575px] w-[155px] h-[132px] bg-[#fff4e4] rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
        <div className="absolute left-[195px] top-[575px] w-[155px] h-[132px] bg-[#fff4e4] rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
        {/* 랭크 타이틀/이미지/라벨 */}
        <p className="absolute left-[30px] top-[586px] text-[12px] font-bold text-black">챌린지 랭크</p>
        <div className="absolute left-[44px] top-[605px] w-[113px] h-[72px]">
          <img src={IMG_RANK_GROUP} alt="랭크" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget.style.display = 'none'); }} />
        </div>
        <p className="absolute left-[134px] top-[681px] text-[12px] font-bold text-black">골드</p>

        {/* 친구 현황/숫자/이미지 */}
        <p className="absolute left-[206px] top-[586px] text-[12px] font-bold text-black">친구 현황</p>
        <p className="absolute left-[307px] top-[684px] text-[12px] font-bold text-black">9 / 10</p>
        <div className="absolute left-[240px] top-[601px] w-[71px] h-[80px]">
          <img src={IMG_MAN} alt="친구" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget.style.display = 'none'); }} />
        </div>

        {/* 하단 탭 바 */}
        <div className="absolute left-0 right-0 bottom-0 h-[88px] px-4 pt-4 pb-8 bg-white flex gap-1">
          {[
            { label: "홈", icon: ICONS.home, href: "/main", active: false },
            { label: "카드뉴스", icon: ICONS.card, href: "/cardnews", active: false },
            { label: "스캔", icon: ICONS.scan, href: "#", active: false },
            { label: "챌린지", icon: ICONS.challenge, href: "/challenge", active: true },
            { label: "내 프로필", icon: ICONS.profile, href: "#", active: false },
          ].map((t) => (
            <Link key={t.label} href={t.href} className="flex-1 flex flex-col items-center gap-2" aria-current={t.active ? "page" : undefined}>
              <MaskIcon src={t.icon} size={20} color={t.active ? COLOR_ACCENT : COLOR_ICON_INACTIVE} />
              <span className={`${t.active ? "text-[#1f2024] font-semibold" : "text-[#71727a]"} text-[10px] leading-[14px]`}>{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
