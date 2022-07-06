import { useEffect } from "react";

/*┌───────────────────────────────────────────────┒
  │  브라우저 창 닫힘 버튼 눌렀을때 얼럿          ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UsePrevent() {
  const usePreventLeave = () => {
    const handle = (e) => {
      e.preventDefault(); // <- 변경된 사항이 저장되지 않을 수 있습니다. 대화상자 나타남
      e.returnValue = ""; // <- beforeunload 는 returnValue를 요구함, 없으면 안됨
    };

    // beforeunload : window가 닫히기 전에 handle 함수를 실행함
    const enablePrevent = () => window.addEventhandle("beforeunload", handle);
    const disablePrevent = () =>
      window.removeEventhandle("beforeunload", handle);
    return { enablePrevent, disablePrevent };
  };
  useEffect(() => {
    usePreventLeave;
  }, []);
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
}
