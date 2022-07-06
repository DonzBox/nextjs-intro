import { useEffect } from "react";

/*┌───────────────────────────────────────────────┒
  │  윈도우10 크롬에서는 알림이 우하단에 나타남   ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseNotification() {
  const useNotification = (title, options) => {
    // window notification에 접근하는 방법
    useEffect(() => {
      if (!("Notification" in window)) {
        // window가 아니라면 이 브라우저는 notification을 지원하지 않기 때문에 return
        return;
      }
    }, []);
    const fireNotif = () => {
      /*
       1. Notification.permission은 사용자가 알람 받기 denied/granted/default(=denied) 인지 알려줌
       2. 최초의 알람은 default 상태이기 때문에 이미 denied 이므로 허용을 해줘야 함
       */
      if (Notification.permission !== "granted") {
        // https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          } else {
            return;
          }
        });
      }
      // 사용자가 알람 받기를 허용했을 경우 "알림" 발송
      else {
        new Notification(title, options);
      }
    };
    return fireNotif;
  };
  const triggerNotif = useNotification("Can I steal your kimch?", {
    body: "I love kimch dont you?",
  });
  return (
    <div>
      <button onClick={triggerNotif}>Noti</button>
    </div>
  );
}
