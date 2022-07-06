import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeadLayout from "./compnents/HeadLayout";

// NextJS, React 설정 팁
// https://velog.io/@hotdari90/VS-CODE-Settings

// 공부대상 : useState, useEffect, useRouter, async, await
// https://xiubindev.tistory.com/97?category=826117
export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    /*
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}`
    );
    */
    router.push(`/movies/${title}/${id}`);
  };
  // useState는 setMovies함수 실행하면서 화면을 reRendering 해줌
  const [movies, setMovies] = useState(); // <- useState([]); 하단에 movies에 map 초기화
  useEffect(() => {
    (async () => {
      /*
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`
      );
      const json = await response.json();
      */
      // 비구조화할당 https://yuddomack.tistory.com/entry/자바스크립트-문법-비구조화-할당
      // 에러처리     https://velog.io/@eassy/fetch-라이브러리
      // #01.Client Side Render
      // const { results } = await (await fetch(`/api/movies`)).json();
      console.log(results);
      setMovies(results);
    })(); // <- aysnc 부분이 익명 함수(재사용 불가)로 작성되었고, 익명 함수는 즉시 실행해야 하기 때문에 ()를 이용해 익명 함수를 바로 호출
  }, []); // <- https://ko-de-dev-green.tistory.com/18
  return (
    <div>
      <HeadLayout title="Home" />

      {/*
      Jsp 기반의 html에서는 input 엘리먼트에 value 속성이 지정된 것과 상관없이 입력이 가능한데
      React에는 value 속성만 지정하면 값이 입력되지 않는 현상이 있다.
      input 엘리먼트에 value 속성만 지정하면 value 속성으로만 값을 컨트롤할 수 있는 권한이 있기 때문에
      (사용자가 값을 입력하는 권한이 없어) input 안에 값이 입력되지 않는다.
      해결방법은 onChange를 써서 input 엘리먼트를 수정할 수 있는 상태로 만들어줘야된다.
      */}

      {/* !movies ? <h4>Loading...</h4> : null } <- 아래문장과 같은 뜻 */}
      {!movies && <h4>Loading...</h4>}
      {
        // ?의 의미는 movies가 null이면 map을 실행하지 않음
        movies?.map((movie) => (
          <div
            onClick={() => onClick(movie.id, movie.original_title)}
            className="movie"
            key={movie.id}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.original_title}`}
              width={350}
              height={500}
            />
            <h4>
              <Link
                /*
                href={{
                  pathname: `/movies/${movie.id}`,
                  query: {
                    title: movie.original_title,
                  },
                }}
                as={`/movies/${movie.id}`}
                */
                href={`/movies/${movie.original_title}/${movie.id}`}
              >
                <a>{movie.original_title}</a>
              </Link>
            </h4>
          </div>
        ))
      }
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// async를 사용한 이유는 하단에 await를 사용했기 때문, 외부API Fetch
export async function getServerSideProps() {
  // # 02.Server Side Render
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  // SSProps 문장의 고정값
  return {
    props: {
      results,
    },
  };
}
