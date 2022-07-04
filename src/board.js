import axios from "axios";
import { useEffect, useState } from "react";

export const Board = () => {
  const [input, setInput] = useState("");

  const renderBoards = () => {
    axios
      .get("http://ec2-18-209-59-84.compute-1.amazonaws.com/board")
      .then((res) => {
        const boards = res.data;
        const list = document.querySelector("ul");
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        boards.forEach((board) => {
          const l = document.createElement("li");
          l.innerText = board.content;
          list.appendChild(l);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    renderBoards();
  }, []);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          const c = document.querySelector("input").value;
          axios
            .post("http://ec2-18-209-59-84.compute-1.amazonaws.com/board", {
              content: c,
            })
            .then(() => {
              renderBoards();
              setInput("");
            });
        }}
      >
        Submit
      </button>
      <ul></ul>
    </div>
  );
};
