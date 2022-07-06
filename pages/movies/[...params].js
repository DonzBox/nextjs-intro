import { useRouter } from "next/router";
import HeadLayout from "../compnents/HeadLayout";

// params 파라미터가 없었다면 router는 클라이언트 사이드에서 작동되었을 거임
export default function Detail({ params }) {
  const router = useRouter();
  // const [title, id] = router.query.params || [];
  // 시크릿모드에서 작동
  const [title, id] = params || [];
  console.log(router);
  return (
    <div>
      <HeadLayout title={title} />
      <h4>
        {
          // router.query.title || "Loading..."
          title
        }
      </h4>
    </div>
  );
}

// ctx : Next.js가 server-side context를 제공함, 내부url 가져오기용 Fetch
export function getServerSideProps({ params: { params } }) {
  console.log(params);
  return {
    props: { params },
  };
}
