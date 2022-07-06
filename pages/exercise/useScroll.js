import { useState, useEffect } from "react";
export default function UseScroll() {
  const useScroll = () => {
    const [status, setStatus] = useState({ y: 0, x: 0 });
    const handler = () => {
      console.log(window.scrollY, window.scrollX);
      setStatus({ y: window.scrollY, x: window.scrollX });
    };
    // useEffect를 사용함으로 써 스크롤이 될때마다 핸들러를 호출한다
    useEffect(() => {
      window.addEventListener("scroll", handler);
      return () => {
        window.removeEventListener("scroll", handler);
      };
    }, []);
    return status;
  };
  const { y } = useScroll();
  return (
    <div style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
        Hello
      </h1>
    </div>
  );
}
