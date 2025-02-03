import {useState} from "react";

import { Form, Preview } from "../components";

function Send() {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  return (
    <>
      {products.length > 0 ? (
        <Preview products={products} messages={messages} />
      ) : (
        <Form setParentMessage={setMessages} setParentProducts={setProducts} />
      )}
    </>
  );
}

export default Send;
