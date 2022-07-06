import { useEffect } from "react";

/*┌───────────────────────────────────────────────┒
  │  정말 저장하시겠습니까? 컨펌창                ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseConfirm() {
  // message 기본값은 ""
  const useConfirm = (message = "", onConfirm, onCancel) => {
    const confirmAct = () => {
      if (typeof onConfirm !== "function" || typeof onCancel !== "function")
        return;
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    useEffect(() => {
      useConfirm;
    }, []);
    return confirmAct;
  };
  const yesProcess = () => {
    console.log("Yes Processing...");
  };
  const noProcess = () => {
    console.log("No Processing...");
  };
  const confirm = useConfirm("Are you sure?", yesProcess, noProcess);

  return (
    <div>
      <button onClick={confirm}>SAVE</button>
    </div>
  );
}
