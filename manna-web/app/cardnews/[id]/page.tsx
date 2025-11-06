"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

// 자산 URL (Figma Dev Mode)
const HERO_IMG = "http://localhost:3845/assets/6e5dfd7c88ab5de3ce7e684e9748a51faa22e642.png";
const ICON_ARROW_LEFT = "http://localhost:3845/assets/7843c96e9d2f6877d77cee31393aecfb5a416fc8.svg";
const ICON_HEART = "http://localhost:3845/assets/3ba208b9d85fbf65550ea23dfddc05bbf748343f.svg";
const ICON_CHAT = "http://localhost:3845/assets/998009d27af15fc1c4dad4d94f137776dc13f9cf.svg";
const ICON_SEND = "http://localhost:3845/assets/722c5e26ab3815ab5e338cf59e11f2c4fd419079.svg";

const COLOR_ACCENT = "#E86339"; // Highlight/Darkest
const COLOR_TEXT_DARKEST = "#1F2024";
const COLOR_TEXT_DARK = "#2F3036";

function MaskIcon({ src, size = 20, color = "#2F3036", className = "" }: { src: string; size?: number; color?: string; className?: string }) {
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

export default function CardNewsDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // 현재는 1번 카드 상세를 우선 구현
  const title = "색다른 음료가 마시고 싶은 날에는?";
  const kicker = "레몬 아이스티에 샷 추가";
  const body = [
    "샷 추가가 멈추지 않는 탓일까? ㅜ.ㅜ",
    "레몬 아이스티에 샷추가, 에디터가 한 번 먹어봤습니다.",
    "복숭아 아이스티와는 또 다른 맛이 특이하게 느껴졌는데요.",
    "시험기간 아샷추가 질렸다면 레아추 도전해보세요!",
  ];
  const tags = ["레몬", "커피", "아망추", "아이스티"]; // Support/Warning/Light 배경

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      {/* 모바일 프레임 */}
      <div className="relative h-[812px] w-[375px] bg-white text-[#1f2024] md:rounded-2xl md:shadow-md overflow-hidden">
        <div className="flex flex-col h-full">
          {/* 상단 네비 - 56px, 최상단 고정 */}
          <div className="sticky top-0 z-10 h-[56px] bg-white">
            <div className="relative h-full">
              <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#1f2024]">탐색 탭</p>
              <Link href="/cardnews" aria-label="뒤로" className="absolute left-[24px] top-1/2 -translate-y-1/2 size-5 flex items-center justify-center">
                <MaskIcon src={ICON_ARROW_LEFT} color={COLOR_ACCENT} size={20} />
              </Link>
            </div>
          </div>

          {/* 본문 스크롤 영역 */}
          <div className="flex-1 overflow-auto">
            {/* 상단 피드 영역 */}
            <div className="bg-[#eaf2ff]">
              <div className="relative h-[349px] w-[375px] mx-auto">
                {/* 메인 이미지 */}
                <img src={HERO_IMG} alt="카드뉴스 상세 이미지" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget.style.display = 'none'); }} />
                {/* 페이지네이션 점 */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
                  <span className="size-2 rounded-full bg-[#e86339]" />
                  <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
                  <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
                  <span className="size-2 rounded-full bg-[#1f2024] opacity-10" />
                </div>
              </div>
            </div>

            {/* 디테일 영역 */}
            <div className="bg-white p-6 space-y-10">
              {/* 타이틀과 우상단 액션 */}
              <div className="relative">
                <div className="w-[326px]">
                  <p className="text-[18px] font-extrabold tracking-[0.09px] text-[#1f2024]">{title}</p>
                  <p className="text-[16px] leading-[22px] text-[#1f2024]">{kicker}</p>
                </div>
                {/* 액션 아이콘들 */}
                <div className="absolute right-0 top-0 flex items-center gap-3">
                  <MaskIcon src={ICON_HEART} color={COLOR_TEXT_DARK} size={20} />
                  <MaskIcon src={ICON_CHAT} color={COLOR_TEXT_DARK} size={20} />
                  <MaskIcon src={ICON_SEND} color={COLOR_TEXT_DARK} size={20} />
                </div>
              </div>

              {/* 본문 텍스트 */}
              <div className="text-[12px] leading-4 tracking-[0.12px] text-[#71727a] space-y-1">
                {body.map((line, idx) => (
                  <p key={idx} className="m-0">{line}</p>
                ))}
              </div>

              {/* 해시태그 */}
              <div className="space-y-2">
                <p className="text-[12px] font-bold text-[#1f2024]">해시태그</p>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-[12px] bg-[#fff4e4]">
                      <span className="px-1 text-[10px] font-semibold uppercase tracking-[0.5px] text-[#e86339]">{t}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* 하단 여백 */}
              <div className="h-6" />
            </div>
          </div>
        </div>

        {/* 하단 안전 영역 (필요 시 버튼 자리) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0" />
      </div>
    </div>
  );
}
