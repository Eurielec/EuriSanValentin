import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function NavBar() {

  const [imageClass, setImageClass] = useState("san-valentin reduced");

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : null
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window?.innerWidth);
      if (window?.innerWidth > 600) {
        setImageClass("san-valentin");
      } else {
        setImageClass("san-valentin reduced");
      }
    }
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar-container">
      <Link href="/">
      <Image
          height={imageClass === "san-valentin reduced" ? 34*1.2 : 34}
          width={imageClass === "san-valentin reduced" ? 288*1.2 : 288}
          layout="intrinsic"
          className={imageClass}
          src="/assets/sanvalentin.svg"
          alt="Eurielec's San Valentin"
          priority
          loading="eager"
        />
      </Link>
      <div className="right-menu">
      {/*<Link href="https://forms.gle/vWbirXcTNsynQ6ys5">
      <Image
          height={imageClass === "san-valentin reduced" ? 172*0.1 : 172*0.2 }
          width={imageClass === "san-valentin reduced" ? 616*0.1 : 616*0.2 }
          layout="intrinsic"
          className={imageClass}
          src="/assets/enviar.svg"
          alt="Enviar"
          loading="eager"
        />
  </Link>*/}  
 
      <Link href="/check">
      <Image
          height={imageClass === "san-valentin reduced" ? 174*0.1 : 174*0.2 }
          width={imageClass === "san-valentin reduced" ? 938*0.1 : 938*0.2 }
          layout="intrinsic"
          className={imageClass}
          src="/assets/comprobar.svg"
          alt="Comprobar"
          loading="eager"
        />
      </Link> 
      <Link href="mailto:it@eestec.es">
      <Image
          height={imageClass === "san-valentin reduced" ? 170*0.1 : 170*0.2 }
          width={imageClass === "san-valentin reduced" ? 765*0.1 : 765*0.2 }
          layout="intrinsic"
          className={imageClass}
          src="/assets/contacto.svg"
          alt="Contacto"
          loading="eager"
        />
      </Link>
      </div>
    </div>
  );
}

export default NavBar;
