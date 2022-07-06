import { useEffect, useRef } from "react";

/*┌───────────────────────────────────────────────┒
  │  클릭시 함수 호출                             ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseClick() {
  const useClick = (onClick) => {
    const element = useRef();
    useEffect(() => {
      if (typeof onClick !== "function") return;
      // useClick이 최초 1회 페이지가 호출 되었을때 클릭이벤트 리스너 부여
      if (element.current) {
        element.current.addEventListener("click", onClick);
      }
      // useClick이 반환 될때는 페이지가 종료되는 시점에 useEffect는 return을 호출하게 되기 때문에 리스너 해제 실행하게 해 줌
      return () => {
        if (element.current) {
          element.current.removeEventListener("click", onClick);
        }
      };
    }, []); // <- 페이지가 로딩되는 최초 1회만 useEffect 실행
    // React 16.8v 부터는 Hook 을 조건문, 반복문, 중첩함수 내에서 호출할 수 없습니다.
    // useEffect 내에서 이벤트 바인딩을 막고 최종적으로 undefinded 를 리턴 해야합니다.
    return element;
  };
  const writeText = () => {
    console.log("writeText");
  };
  const title = useClick(writeText);
  return (
    <div>
      <h2 ref={title}>Click Me and then Console Log!</h2>
    </div>
  );
}
