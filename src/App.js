import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const App = () => {
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    socket.on("new_chat", (message) => {
      setChatList([...chatList, message]);
    });
  });

  return (
    <div>
      <div>
        {chatList.map((c, index) => {
          return <div key={index}>{c}</div>;
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target[0].value;
          socket.emit("chat", message);
          setChatList([...chatList, message]);
          setChat("");
        }}
      >
        <input
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
          }}
        ></input>
        <button>submit</button>
      </form>
    </div>
  );
};

export default App;
