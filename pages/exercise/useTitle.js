import { useState, useEffect } from "react";

/*┌───────────────────────────────────────────────┒
  │  브라우저 탭바(타이틀) 콤포넌트 컨트롤        ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseTitle() {
  const useTitle = (initTitle) => {
    const [title, setTitle] = useState(initTitle);
    const updateTitle = () => {
      const titleText = document.querySelector("diva");
      titleText.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
  };
  const titleChange = useTitle("Loading...");
  setTimeout(() => titleChange("Hone"), 3000);
  return <diva>change title</diva>;
}
