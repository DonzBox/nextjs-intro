import { useState, useEffect } from "react";

/*┌───────────────────────────────────────────────┒
  │  내 웹사이트가 온라인지 아닌지                ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseNetwork() {
  const useNetwork = (onChange) => {
    console.log(1);
    // SSR 로부터 시작되기 때문에 navigator.onLine 문장은 실행불가 하므로 false를 넣어줌
    // 대신 페이지가 완전로드 된 후 상태인 useEffect에 setStatus에 넣어서 초기화 함
    const [status, setStatus] = useState(false);
    const handle = () => {
      console.log(3);
      if (typeof onChange === "function") {
        onChange(navigator.onLine);
      }
      setStatus(navigator.onLine);
    };
    useEffect(() => {
      console.log(4);
      setStatus(navigator.onLine); // <--- SSR에서 setStatus을 navigator.onLine로 초기화 할 수 없기 때문에 여기서 초기화 함
      window.addEventListener("online", handle);
      window.addEventListener("offline", handle);
      return () => {
        console.log(5);
        window.removeEventListener("online", handle);
        window.removeEventListener("offline", handle);
      };
    }, []);
    console.log(6);
    return status;
  };
  const onChangeFunc = (arg) => {
    console.log(7);
    console.log(arg ? "We are online" : "We are offline");
  };

  console.log(8);
  const networkStatus = useNetwork(onChangeFunc);
  console.log(9);
  return (
    <div>
      <h1>
        {console.log(10)}
        {networkStatus ? "Online" : "Offline"}
      </h1>
    </div>
  );
}
