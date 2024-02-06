import { Piruletas, Preview } from "../components";
import Link from "next/link";
function Home() {
  return <div className="home">

  <Piruletas/>
  <Link href="/test">
    <button className="button">No te metas aquí</button>
    </Link>
  
  </div>;
}

export default Home;
