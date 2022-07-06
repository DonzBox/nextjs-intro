import { useEffect, useState } from "react";
import defaultAxios from "axios";

/*┌───────────────────────────────────────────────┒
  │  AJAX vs AXIOS                                ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  1) Refetch button 누르면
  2) setTrigger가 발동되고
  3) trigger가 업데이트 되서
  4) useEffect의 dependency인 trigger로 인해 useEffect가 다시 실행되는것 맞죠? */

export default function UseAxios() {
  // axiosInstance를 전달받지 못하면 패지기로 import한 defaultAxios로 사용할 거임
  // (https://github.com/axios/axios#creating-an-instance)
  const useAxios = (options, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
      loading: true,
      data: null,
      error: null,
    });

    const [trigger, setTrigger] = useState(0);
    const refetch = () => {
      setState({
        ...state,
        loading: true,
      });
      setTrigger(Date.now());
    };

    useEffect(() => {
      if (!options.url) return;
      axiosInstance(options)
        // Axios는 내부적으로 res.json()을 수행합니다. 따라서 request.data만 수행하면 됩니다.
        .then((data) => {
          setState({
            // 과거값
            ...state,
            // then data로 온 바뀐값
            loading: false,
            data,
          });
        })
        .catch((error) => {
          setState({
            ...state,
            loading: false,
            error,
          });
        });
    }, [trigger]); // <- refetch 실행하여 access request 다시 함

    return { ...state, refetch };
  };

  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json",
  });
  console.log(`Loading: ${loading} / Error:${error}`); // Data: ${JSON.stringify(data)}\n
  return (
    <div>
      {/* 콘솔에서 시도하면 4 && 6은 6을 반환합니다.
           &&를 'true' 값과 함께 사용하면 결과적으로 항상 두 번째 값을 얻습니다. */}
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}
