import {useState} from "react";

import { Form, Preview } from "../components";

function Send() {

    const [message, setMessage] = useState([]);
  return <>

    {
    (message !== "") ? (
        <Preview message={message}/>
    ) : <Form setParentMessage={setMessage}/>
    }
  
  </>;
}

export default Send;
