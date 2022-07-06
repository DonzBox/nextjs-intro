import { useRef } from "react";
export default function UseFullscreen() {
  const useFullscreen = (callback) => {
    const element = useRef();
    const runCallback = (isFull) => {
      if (callback && typeof callback === "function") callback(isFull);
    };
    const triggerFull = () => {
      if (element.current) {
        if (element.current.requestFullscreen)
          element.current.requestFullscreen();
        else if (element.current.mozRequestFullscreen)
          element.current.mozRequestFullscreen();
        else if (element.current.webkitRequestFullscreen)
          element.current.webkitRequestFullscreen();
        else if (element.current.msRequestFullscreen)
          element.current.msRequestFullscreen();
        runCallback(true);
      }
    };
    const exitFull = () => {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullscreen) document.mozCancelFullscreen();
      else if (document.webkitFullscreen) document.webkitFullscreen();
      else if (document.msFullscreen) document.msFullscreen();
      runCallback(false);
    };
    return { element, triggerFull, exitFull };
  };
  const onFullscreen = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };
  // dependency injection :)
  const { element, triggerFull, exitFull } = useFullscreen(onFullscreen);
  return (
    <div>
      <div ref={element}>
        <img src="https://item.kakaocdn.net/do/0fab671387d5b562f284de975ca5183126397d82c8691bdabf557d1536959d9c" />
        <br />
        <button onClick={exitFull}>exit fullscreen</button>
      </div>
      <button onClick={triggerFull}>make fullscreen</button>
    </div>
  );
}
