import NavBar from "./compnents/NavBar";
import Layout from "./compnents/Layout";

// pagePropss는 index.js페이지의 getServerSideProps 값을 가져오기 위함
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
