import Head from "next/head";
import { Layout, PedidosCerrados } from "../components";

import "../styles/style.scss";

export default function MyApp({ Component, pageProps }) {

  return (
    <div className="app">
      <Head>
      <script async src="https://analytics.devve.space/script.js" data-website-id="092a6651-70fe-44c2-b15b-f09d3c305ae9"></script>
        <title>San Valentín</title>
        <meta name="description" content="Descubre si algún admirador te ha dejado alguna piruleta con mensaje!" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
        <Layout>
          {/*<PedidosCerrados />*/}
           <Component {...pageProps} /> 
        </Layout>
    </div>
        
  );
}
