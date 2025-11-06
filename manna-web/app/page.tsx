import Link from "next/link";

// Figma Dev 모드 에셋 (로컬 프리뷰 서버)
const IMG_MAIN = "http://localhost:3845/assets/8a70aa02fde02474827466302d61215c6c9fc5fb.png"; // image 8

export default function IntroPage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      {/* 모바일 프레임(375x812) 시뮬레이션: 데스크톱에서 중앙 정렬 */}
      <div className="relative h-[812px] w-[375px] bg-white text-black md:rounded-2xl md:shadow-md overflow-hidden">
        {/* 상태바 영역 (단순 여백) */}
        <div className="h-[44px]" />

        {/* 메인 이미지 */}
        <div className="absolute left-1/2 top-[calc(50%-91px)] size-[181px] -translate-x-1/2 -translate-y-1/2">
          <img
            src={IMG_MAIN}
            alt="메인 일러스트"
            className="block size-full object-cover rounded-[24px]"
          />
        </div>

        {/* 타이틀 */}
        <p className="absolute left-1/2 top-[402px] -translate-x-1/2 text-[18px] font-extrabold tracking-[0.09px] text-black whitespace-nowrap">
          맛난 한국 음식을 만나다
        </p>
        {/* Tip 텍스트 */}
        <p className="absolute left-1/2 top-[447px] -translate-x-1/2 text-[12px] tracking-[0.12px] text-[#7c7c7c] whitespace-nowrap">
          Tip. 한국에서는 밥그릇을 들고 먹지 않습니다.
        </p>

        {/* 시작하기 버튼 */}
        <Link
          href="/home"
          className="absolute left-1/2 bottom-[22px] -translate-x-1/2 w-[327px] h-[48px] bg-[#e86339] text-white rounded-[12px] flex items-center justify-center text-[12px] font-semibold"
        >
          시작하기
        </Link>
      </div>
    </div>
  );
}
