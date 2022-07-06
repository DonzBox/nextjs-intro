import { useRef } from "react";

/*┌───────────────────────────────────────────────┒
  │  글자가 서서히 fade in                        ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseFadeIn() {
  const useFadeIn = (duration, delay) => {
    const element = useRef();
    const { current } = element;
    if (typeof duration !== "number" || typeof delay !== "number") return;
    if (element.current) {
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
    return { ref: element, style: { opacity: 0 } };
  };
  // 함수를 인수로 전달하는 것을 의존성 주입이라고 부릅니다. dependency injection :)
  const fadeH1Func = useFadeIn(1, 1);
  const fadeH2Func = useFadeIn(5, 0);
  return (
    <div>
      <h1 {...fadeH1Func}>This is H1</h1>
      <h2 {...fadeH2Func}>This is H2</h2>
    </div>
  );
}
