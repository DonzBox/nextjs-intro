import { useEffect } from "react";

/*┌───────────────────────────────────────────────┒
  │  브라우저 창을 벗어나면 감지 (여기서는 위로)  ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseBeforeLeave() {
  const useBeforeLeave = (onBefore) => {
    const handle = (e) => {
      if (typeof onBefore !== "function") return;
      const { clientY } = e;
      if (clientY <= 0) onBefore();
    };
    // 중요 : addEventListener를 부여할때는 useEffect를 사용하여 페이지가 종료될때 return 을 통해 리스너를 해제한다
    useEffect(() => {
      // mouseleave : document 에서 마우스포커스가 벗어나면 handle을 실행함
      document.addEventListener("mouseleave", handle);
      return () => document.removeEventListener("mouseleave", handle);
    }, []);
  };
  const leaveFunc = () => console.log("dont leave me!");
  useBeforeLeave(leaveFunc);
  return (
    <div>
      <h1>Do Leave BrowserWindow to UP!</h1>
    </div>
  );
}
