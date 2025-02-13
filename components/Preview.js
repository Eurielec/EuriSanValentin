import Image from "next/image";

function Preview({ products }) {
  return (
    <div className="preview-container">
      {products.map((product, index) => (
        <div key={index} className="card-container">
          <Image
            height={1240 * 0.2}
            width={900 * 0.2}
            layout="intrinsic"
            className={product.product_type}
            src={`/assets/${
              product.product_type === "chocolate"
                ? "chocolate.png"
                : product.product_type === "piruleta"
                ? "piruleta.png"
                : "piruleta.png"
            }`}
            alt={
              product.product_type === "chocolate"
                ? "Chocolate"
                : product.product_type === "piruleta"
                ? "Piruleta"
                : "Piruleta y chocolate"
            }
          />
          <div className="note">
            <h3>
              {product.product_type === "chocolate" 
                ? "Chocolate"
                : product.product_type === "piruleta" 
                ? "Piruleta"
                : "Piruleta y chocolate"}{" "}
              {index + 1}
            </h3>
            <p>{product.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Preview;