import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  // 컴포넌트 내부에서 router를 사용하면 프론트에서만 실행이 됨
  const router = useRouter();
  console.log(router);
  return (
    <nav>
      <img src="/vercel.svg" />
      <div>
        {/* Link 는 브라우저를 새로고침 없이 다른페이지로 이동시켜 줌 */}
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>Home</a>
        </Link>
        <Link href="/about">
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
