import { useState } from "react";

/*┌───────────────────────────────────────────────┒
  │  탭으로 구성하는 페이지                       ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseTabs() {
  const content = [
    {
      tab: "Section 1",
      content: "This is content 1",
    },
    {
      tab: "Section 2",
      content: "This is content 2",
    },
  ];
  const useTabs = (initTab, allTabs) => {
    const [idx, setIdx] = useState(initTab);
    if (!allTabs || !Array.isArray(allTabs)) return;
    return {
      currentItem: allTabs[idx],
      changeIdx: setIdx,
    };
  };
  const { currentItem, changeIdx } = useTabs(0, content);
  return (
    <div>
      {content.map((s, idx) => (
        // onClick={changeValue(index)}는 자동으로 함수를 즉시 호출하고 있습니다.
        // onClick={() => x}의 x는 onClick으로 호출될 함수입니다.
        // 참고 : https://ko.reactjs.org/docs/faq-functions.html
        // 아래의 changeIdx 는 상단 리턴값으로 선언된 changeIdx가 setIdx() 와 같은것임
        <button onClick={(e) => changeIdx(idx)} key={idx}>
          {s.tab}
        </button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
}
