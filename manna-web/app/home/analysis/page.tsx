"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Star({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? "#e86339" : "none"}
        stroke={filled ? "#e86339" : "#d4d6dd"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function StarRating({ value = 4 }: { value?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < value} />
      ))}
    </div>
  );
}

function ProgressBar({ percent = 75 }: { percent?: number }) {
  return (
    <div className="h-2 w-[300px] rounded bg-[#e8e9f1] overflow-hidden">
      <div className="h-full rounded bg-[#ff616d]" style={{ width: `${percent}%` }} />
    </div>
  );
}

function Chip({ label, active, tone = "orange" }: { label: string; active?: boolean; tone?: "orange" | "blue" }) {
  const activeBg = tone === "orange" ? "#e86339" : "#3b82f6";
  const inactiveBg = tone === "orange" ? "#feebeb" : "#eaf2ff";
  const activeText = "#ffffff";
  const inactiveText = tone === "orange" ? "#e86339" : "#1f2024";
  return (
    <span
      className="px-2.5 py-1.5 rounded-[12px] text-[10px] font-semibold uppercase tracking-[0.5px]"
      style={{ backgroundColor: active ? activeBg : inactiveBg, color: active ? activeText : inactiveText }}
    >
      {label}
    </span>
  );
}

function RadarChart() {
  // 정적 6축 레이더 차트 (시각 유사 재현)
  const size = 298;
  const cx = size / 2;
  const cy = size / 2;
  const r = 120;
  const spokes = 6;
  const rings = 5;
  const labels = ["짠맛", "신맛", "쓴맛", "매운맛", "느끼한맛", "단맛"];
  const labelPos = [
    { x: cx, y: 14, align: "middle" }, // 짠맛(상)
    { x: size - 12, y: cy - 10, align: "end" }, // 신맛(우상)
    { x: size - 12, y: cy + 100, align: "end" }, // 쓴맛(우하)
    { x: cx, y: size - 8, align: "middle" }, // 매운맛(하)
    { x: 12, y: cy + 100, align: "start" }, // 느끼한맛(좌하)
    { x: 12, y: cy - 10, align: "start" }, // 단맛(좌상)
  ] as const;

  // 폴리곤 값(0~1) 임의 예시: 단맛 0.4, 짠맛 0.7, 신맛 0.55, 쓴맛 0.35, 매운맛 0.8, 느끼한맛 0.3
  const values = [0.7, 0.55, 0.35, 0.8, 0.3, 0.4];

  const points = values.map((val, i) => {
    const angle = (-Math.PI / 2) + (i * (2 * Math.PI / spokes));
    const rr = r * val;
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)];
  });

  const pointsAttr = points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg width={size} height={size} className="bg-white">
      {/* 눈금 원 */}
      {[...Array(rings)].map((_, i) => (
        <circle key={i} cx={cx} cy={cy} r={r * ((i + 1) / rings)} fill="none" stroke="#e8e9f1" strokeWidth="1" />
      ))}
      {/* 스포크 라인 */}
      {[...Array(spokes)].map((_, i) => {
        const angle = (-Math.PI / 2) + (i * (2 * Math.PI / spokes));
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e8e9f1" strokeWidth="1" />;
      })}
      {/* 데이터 폴리곤 */}
      <polygon points={pointsAttr} fill="#e86339" fillOpacity="0.2" stroke="#e86339" strokeWidth="2" />
      {/* 축 라벨 */}
      {labels.map((label, i) => (
        <text
          key={label}
          x={labelPos[i].x}
          y={labelPos[i].y}
          textAnchor={labelPos[i].align as any}
          fontSize={12}
          fill="#1f2024"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function AnalysisResultPage() {
  const photoSrc = "/assets/main/cardNews/IMG_1.jpg";
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#f8f9fe] flex items-start justify-center py-10">
      {/* 모바일 뷰포트 */}
      <div className="relative w-[375px] h-[1586px] bg-[#eaf2ff] overflow-hidden">
        {/* 큰 X 버튼 (StatusBar 제거, 좌측 상단 고정) */}
        <div className="absolute left-4 top-4 z-10">
          <button
            type="button"
            aria-label="close"
            onClick={() => router.push("/main")}
            className="flex size-10 items-center justify-center rounded-full bg-white shadow-md text-[#2f3036] text-[20px] leading-none cursor-pointer active:scale-[0.98]"
          >
            ×
          </button>
        </div>

        {/* 스크롤 컨텐츠 (상단 오프셋 제거) */}
        <div className="absolute inset-0 flex flex-col">
          {/* 상단 사진 */}
          <div className="relative h-[326px] w-full">
            <div className="absolute left-[-15px] top-[39px] h-[292px] w-[390px] overflow-hidden">
              <Image
                src={photoSrc}
                alt="uploaded photo"
                fill
                sizes="390px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 상세 영역 */}
          <div className="relative flex-1 bg-white p-6 flex flex-col gap-3">
            {/* 별점 */}
            <StarRating value={4} />

            {/* 제목/헤더 */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-[#1f2024] text-[0px] tracking-[0.09px]">
                  <span className="text-[18px] font-extrabold">김치찌개 </span>
                  <span className="text-[12px] font-bold">[kimcʰic'ige]</span>
                </p>
                <p className="text-[#1f2024] text-[12px] font-bold">당신이 좋아하는 음식과 비슷해요</p>
                {/* 태그들 */}
                <div className="flex items-center gap-2">
                  <Chip label="순두부찌개" tone="orange" />
                  <Chip label="돼지고기" active tone="orange" />
                  <Chip label="두부" tone="orange" />
                  <Chip label="양파" tone="orange" />
                  <Chip label="파" tone="orange" />
                </div>
              </div>
              {/* 하트/플레이 아이콘 영역 (간단 대체) */}
              <div className="flex items-center gap-3 mt-1">
                <div className="size-5 rounded-full border border-[#2f3036]" aria-hidden />
                <div className="size-[11px]" aria-hidden>
                  <svg viewBox="0 0 24 24" width="11" height="11">
                    <path d="M8 5v14l11-7z" fill="#e86339" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 맛 분석 리포트 */}
            <div className="mt-4">
              <p className="text-[12px] font-bold text-[#1f2024] mb-2">맛 분석 리포트</p>
              <div className="w-[298px] h-[298px] overflow-hidden">
                <RadarChart />
              </div>
            </div>

            {/* 음식 소개 */}
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-[12px] font-bold text-[#1f2024]">음식 소개</p>
              <p className="text-[12px] leading-4 text-[#71727a] w-[305px] tracking-[0.12px]">
                김치찌개는 잘 익은 김치와 돼지고기 또는 두부, 양파, 파 등을 넣고 얼큰하게 끓여낸 한국의 대표적인 찌개 요리입니다.
                한국인들이 가장 선호하는 음식 중 하나로, 만드는 재료와 방법에 따라 다양한 맛을 낼 수 있습니다.
              </p>
            </div>

            {/* 매칭 정도 */}
            <div className="mt-6 flex flex-col gap-2">
              <p className="text-[12px] font-bold text-[#1f2024]">음식 매칭 정도</p>
              <ProgressBar percent={75} />
              <p className="text-[12px] leading-4 text-[#71727a] w-[305px]">
                당신은 이 음식을 반드시 좋아해야합니다. 그래야 이 AI가 우쭐고 저쭐고 매칭될거예요. 너 김치 좋아하잖아.
                그니까 김치찌개도 좋아 하겠지!
              </p>
            </div>

            {/* 들어간 재료 */}
            <div className="mt-6 flex flex-col gap-2">
              <p className="text-[12px] font-bold text-[#1f2024]">들어간 재료</p>
              <div className="flex items-center gap-2">
                <Chip label="김치" tone="blue" />
                <Chip label="돼지고기" active />
                <Chip label="두부" tone="blue" />
                <Chip label="양파" tone="blue" />
                <Chip label="파" tone="blue" />
              </div>
            </div>

            {/* 기타 설명 섹션들 */}
            <div className="mt-6 flex flex-col gap-2">
              <p className="text-[12px] font-bold text-[#1f2024]">식감 특징</p>
              <p className="text-[12px] leading-4 text-[#71727a] w-[305px]">바삭함, 부드러움, 탱글함, 밀도감 등</p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <p className="text-[12px] font-bold text-[#1f2024]">우리나라 음식과 비슷한 음식</p>
              <p className="text-[12px] leading-4 text-[#71727a] w-[305px]">바삭함, 부드러움, 탱글함, 밀도감 등</p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <p className="text-[12px] font-bold text-[#1f2024]">유사 맛 음식</p>
              <p className="text-[12px] leading-4 text-[#71727a] w-[305px]">“비슷한 맛으로는 인절미, 단팥죽이 있습니다.”</p>
            </div>

            {/* 자국 리뷰 카드 */}
            <div className="mt-6 bg-[#ffe1d0] p-4 rounded-[16px] w-[327px]">
              <div className="bg-white rounded-[16px] p-4 relative">
                <div className="flex items-start gap-3">
                  <div className="size-[35px] rounded-full bg-[#ddd]" />
                  <div className="flex-1">
                    <p className="text-[12px] font-bold text-black leading-none">tlswo2025</p>
                    <StarRating value={4} />
                    <p className="mt-2 text-[12px] text-black">
                      생각보다 맵지 않고 맛있어요.
                      <br />그런데 저한텐 조금 짠 편이었습니다.
                    </p>
                  </div>
                </div>
                <div className="absolute right-4 bottom-3 flex items-center gap-1 text-[10px]">
                  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden>
                    <path d="M8 5v14l11-7z" fill="#e86339" />
                  </svg>
                  <span>더보기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
