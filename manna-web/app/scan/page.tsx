"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// 간단 스캔(업로드/카메라 대체) 페이지
// 실제 카메라 권한/MediaDevices는 추후 확장 가능 (현재는 업로드)
export default function ScanPage() {
  const router = useRouter();

  // 바텀시트(카메라/갤러리 선택) 열림 상태
  const [scanSheetOpen, setScanSheetOpen] = useState(true);
  // 업로드/촬영된 이미지 미리보기 URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 분석 로딩 상태 및 진행도
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  // 결과 오버레이 표시 상태 추가
  const [showResult, setShowResult] = useState(false);

  // 타이머 ref
  const analysisTimerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  // 숨겨진 입력 ref (카메라 / 갤러리)
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const startAnalysis = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setScanSheetOpen(false);
    setIsAnalyzing(true);
    setProgress(0);

    // 진행률 증가 타이머 (카드뉴스 로직 복제)
    progressTimerRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        const step = Math.floor(Math.random() * 8) + 3; // 3~10%
        return Math.min(95, p + step);
      });
    }, 180);

    // 분석 완료 타이머 (~2.4초)
    analysisTimerRef.current = window.setTimeout(() => {
      setProgress(100);
      setIsAnalyzing(false);
      // URL 해제는 약간 뒤로 지연
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setShowResult(true); // 라우팅 대신 결과 오버레이 표시
    }, 2400);
  }, [router]);

  // 파일 선택 공통 처리
  const handleFileSelected = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    startAnalysis(file);
  }, [startAnalysis]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) window.clearInterval(progressTimerRef.current);
      if (analysisTimerRef.current) window.clearTimeout(analysisTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="relative h-[812px] w-[375px] bg-white text-[#1f2024] md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상단 영역: 제목 / 뒤로가기 */}
        <div className="h-[40px] bg-white sticky top-0 z-10 flex items-center justify-center">
          <p className="text-[14px] font-bold">스캔</p>
          <button
            type="button"
            aria-label="back"
            onClick={() => router.push("/main")}
            className="absolute left-[16px] top-1/2 -translate-y-1/2 size-6 flex items-center justify-center rounded-full text-[#E86339]"
          >
            ←
          </button>
        </div>

        {/* 본문: 프리뷰 없을 때 안내 / 프리뷰 있을 때 이미지 */}
        <div className="flex-1 px-4 pt-4 pb-[120px] overflow-auto">
          {!previewUrl && (
            <div className="h-[360px] rounded-2xl border border-dashed border-[#D4D6DD] flex flex-col items-center justify-center gap-4 bg-[#F8F9FE]">
              <p className="text-[12px] text-[#71727a]">카메라로 촬영하거나 갤러리에서 선택하세요</p>
              <button
                type="button"
                onClick={() => setScanSheetOpen(true)}
                className="h-10 px-6 rounded-[12px] bg-[#E86339] text-white text-[12px] font-semibold"
              >이미지 선택</button>
            </div>
          )}
          {previewUrl && (
            <div className="relative h-[360px] rounded-2xl overflow-hidden bg-black">
              <img src={previewUrl} alt="업로드 미리보기" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* 하단 탭 (간단 버전) */}
        <div className="absolute left-0 right-0 bottom-0 h-[88px] px-4 pt-4 pb-8 bg-white flex gap-1">
          {[
            { label: "메인", onClick: () => router.push("/main"), active: false },
            { label: "카드뉴스", onClick: () => router.push("/cardnews"), active: false },
            { label: "스캔", onClick: () => setScanSheetOpen(true), active: true },
            { label: "챌린지", onClick: () => router.push("/challenge"), active: false },
          ].map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={t.onClick}
              className="flex-1 flex flex-col items-center gap-2"
              aria-pressed={t.active}
            >
              <span
                aria-hidden
                className="size-5 rounded-full"
                style={{
                  backgroundColor: t.active ? "#E86339" : "#D4D6DD",
                  WebkitMaskImage: "url('/assets/icons/scan.svg')",
                  maskImage: "url('/assets/icons/scan.svg')",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
              <p className={`${t.active ? "text-[#1f2024] font-semibold" : "text-[#71727a]"} text-[10px] leading-[14px]`}>{t.label}</p>
            </button>
          ))}
        </div>

        {/* 숨겨진 입력들 */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFileSelected(e.currentTarget.files)}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelected(e.currentTarget.files)}
        />

        {/* 바텀시트 */}
        {scanSheetOpen && !isAnalyzing && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end" onClick={() => setScanSheetOpen(false)}>
            <div className="w-full bg-white rounded-t-2xl p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1.5 bg-[#E3E5E5] rounded-full mx-auto mb-1" />
              <button
                type="button"
                className="w-full h-12 rounded-xl bg-[#E86339] text-white text-sm font-semibold"
                onClick={() => cameraInputRef.current?.click()}
              >
                카메라로 촬영
              </button>
              <button
                type="button"
                className="w-full h-12 rounded-xl border border-[#E0E2E7] text-sm font-semibold"
                onClick={() => galleryInputRef.current?.click()}
              >
                갤러리에서 선택
              </button>
              <button
                type="button"
                className="w-full h-12 rounded-xl bg-white text-[#71727a] text-sm"
                onClick={() => setScanSheetOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* 분석 로딩 오버레이 */}
        {previewUrl && isAnalyzing && (
          <div className="absolute inset-0 z-40">
            <div className="absolute inset-0">
              <img src={previewUrl} alt="업로드 미리보기" className="w-full h-full object-cover blur-md scale-105" />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-[300px] rounded-2xl bg-white/90 shadow-lg backdrop-blur-md p-6 text-center">
                <div className="mx-auto mb-4 relative w-14 h-14">
                  <div className="absolute inset-0 rounded-full border-4 border-[#EDEEF2]" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#E86339] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                </div>
                <p className="text-sm font-semibold text-[#1f2024] mb-1">분석 중...</p>
                <p className="text-xs text-[#71727a]">사진을 분석하고 있어요</p>
                <div className="mt-4">
                  <div className="w-full h-2 bg-[#F0F1F3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#E86339] transition-[width] duration-200 ease-out" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-[#8f9098]">{progress}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 분석 결과 오버레이 */}
        {showResult && previewUrl && !isAnalyzing && (
          <div className="absolute inset-0 z-50">
            {/* 배경 블러 */}
            <div className="absolute inset-0">
              <img src={previewUrl} alt="분석 결과 배경" className="w-full h-full object-cover blur-lg scale-110" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            {/* 결과 카드 */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-[340px] max-h-[95%] overflow-auto rounded-2xl bg-white/95 backdrop-blur-md shadow-xl p-5">
                <button
                  type="button"
                  aria-label="close result"
                  onClick={() => setShowResult(false)}
                  className="absolute right-3 top-3 size-8 flex items-center justify-center rounded-full bg-white shadow text-[#2f3036] text-[18px]"
                >×</button>
                {/* 이미지 미리보기 */}
                <div className="h-[180px] w-full rounded-xl overflow-hidden mb-4 bg-black">
                  <img src={previewUrl} alt="분석된 이미지" className="w-full h-full object-cover" />
                </div>
                {/* 제목/태그 */}
                <div className="mb-4">
                  <p className="text-[16px] font-extrabold leading-tight">김치찌개 <span className="text-[11px] font-bold">[kimcʰic'ige]</span></p>
                  <p className="text-[11px] font-semibold text-[#1f2024] mt-1">당신이 좋아하는 음식과 비슷해요</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['순두부찌개','돼지고기','두부','양파','파'].map(t => (
                      <span key={t} className={`px-2.5 py-1.5 rounded-[12px] text-[10px] font-semibold tracking-[0.5px] uppercase ${t==='돼지고기' ? 'bg-[#e86339] text-white' : 'bg-[#feebeb] text-[#e86339]'}`}>{t}</span>
                    ))}
                  </div>
                </div>
                {/* 맛 분석 리포트 (간단 레이더) */}
                <div className="mb-5">
                  <p className="text-[12px] font-bold mb-2">맛 분석 리포트</p>
                  <RadarMini />
                </div>
                {/* 음식 소개 */}
                <div className="mb-4">
                  <p className="text-[12px] font-bold mb-1">음식 소개</p>
                  <p className="text-[11px] leading-4 text-[#71727a]">김치찌개는 잘 익은 김치와 돼지고기 또는 두부, 양파, 파 등을 넣고 얼큰하게 끓여낸 한국의 대표적인 찌개 요리입니다.</p>
                </div>
                {/* 매칭 정도 */}
                <div className="mb-4">
                  <p className="text-[12px] font-bold mb-1">음식 매칭 정도</p>
                  <div className="w-full h-2 bg-[#e8e9f1] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff616d] w-[75%]" />
                  </div>
                  <p className="text-[11px] text-[#71727a] mt-2">당신은 이 음식을 반드시 좋아해야 합니다. 너 김치 좋아하잖아!</p>
                </div>
                {/* 들어간 재료 */}
                <div className="mb-4">
                  <p className="text-[12px] font-bold mb-1">들어간 재료</p>
                  <div className="flex flex-wrap gap-2">
                    {['김치','돼지고기','두부','양파','파'].map(t => (
                      <span key={t} className={`px-2.5 py-1.5 rounded-[12px] text-[10px] font-semibold tracking-[0.5px] uppercase ${t==='돼지고기' ? 'bg-[#e86339] text-white' : 'bg-[#f8f9fe] text-[#ff616d]'}`}>{t}</span>
                    ))}
                  </div>
                </div>
                {/* 자국 리뷰 */}
                <div className="mb-2 rounded-xl bg-[#ffe1d0] p-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-[11px] font-bold mb-1">tlswo2025</p>
                    <p className="text-[11px] leading-4">생각보다 맵지 않고 맛있어요. 그런데 저한텐 조금 짠 편이었습니다.</p>
                  </div>
                </div>
                {/* 액션 */}
                <div className="mt-4 flex gap-3">
                  <button type="button" onClick={() => setShowResult(false)} className="flex-1 h-10 rounded-xl border border-[#e0e2e7] text-[12px] font-semibold">닫기</button>
                  <button type="button" onClick={() => { setShowResult(false); setScanSheetOpen(true); }} className="flex-1 h-10 rounded-xl bg-[#e86339] text-white text-[12px] font-semibold">다시 스캔</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 간단 레이더 차트 컴포넌트 (축 6개 고정)
function RadarMini() {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const spokes = 6;
  const rings = 4;
  const labels = ["짠맛","신맛","쓴맛","매운맛","느끼한맛","단맛"];
  const values = [0.7,0.55,0.35,0.8,0.3,0.4];
  const points = values.map((val,i) => {
    const angle = (-Math.PI/2) + i * (2*Math.PI/spokes);
    return [cx + r*val*Math.cos(angle), cy + r*val*Math.sin(angle)];
  }).map(p => p.join(",")).join(" ");
  return (
    <svg width={size} height={size} className="bg-white rounded-xl">
      {[...Array(rings)].map((_,i) => <circle key={i} cx={cx} cy={cy} r={r*((i+1)/rings)} fill="none" stroke="#e8e9f1" strokeWidth={1} />)}
      {[...Array(spokes)].map((_,i) => {
        const angle = (-Math.PI/2) + i * (2*Math.PI/spokes);
        return <line key={i} x1={cx} y1={cy} x2={cx + r*Math.cos(angle)} y2={cy + r*Math.sin(angle)} stroke="#e8e9f1" strokeWidth={1} />;
      })}
      <polygon points={points} fill="#e86339" fillOpacity={0.25} stroke="#e86339" strokeWidth={2} />
      {labels.map((l,i) => {
        const angle = (-Math.PI/2) + i * (2*Math.PI/spokes);
        const lx = cx + (r+12)*Math.cos(angle);
        const ly = cy + (r+12)*Math.sin(angle);
        return <text key={l} x={lx} y={ly} fontSize={10} fill="#1f2024" textAnchor="middle" alignmentBaseline="middle">{l}</text>;
      })}
    </svg>
  );
}
