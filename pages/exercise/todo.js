import { useEffect, useState } from "react";

/*┌───────────────────────────────────────────────┒
  │  할 일                                        ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function ToDoEx() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState(["aaa"]);
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault(); // submit으로 화면이 새로 실행되는것을 방지
    if (toDo === "") {
      return;
    } else {
      /*
       1. useState의 state(여기서는 toDos)는 직접적으로 수정이 불가능 함(toDos.push() 이런식으로는 불가능)
       2. 그렇기 때문에 setToDos 를 사용하여 toDos를 수정해야 함
       중요) setToDos 파라미터로 함수를 사용한다면
             첫번째 인자값인 currentArray는 useState의 state의 첫번째 인자값으로 설정됨
      */
      setToDos((currentArray) => [toDo, ...currentArray]);
      setToDo("");
    }
    // a = [1, 2, 3, 4]; b = [5]; [1, 2, 3, 4, 5]로 만들려면 [a, ...b]
  };
  /*
   useState는 상태 업데이트 로직을 비동기로 실행하기 때문에 기존 명령형 프로그램에서
   변수 선언-할당-접근과 달리 상태가 상태 업데이트 함수를 호출한 다음 줄에서 바로 업데이트되지 않는다.
   상태 업데이트 후 코드를 실행하고 싶으면 아래와 같이 useEffect를 사용한다
  */
  //useEffect(() => {
  console.log(toDos);
  //}, [toDos]);

  console.log();

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="write your to do here..."
        />
        <button>ADD</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, idx) => (
          <li key={idx}> {item} </li>
        ))}
      </ul>
    </div>
  );
}
