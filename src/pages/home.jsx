import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import ChatlistCard from "../components/ChatListCard";
import { stringify } from "postcss/lib/postcss";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();
      setContent("");

      if (!content) return;

      setLoading(true);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API}`,
          },
        }
      );

      const newChat = {
        question: content,
        answer: response.data.choices[0].message.content,
      };

      //localStorage를 사용하는 것이기 때문에 let을 사용해도 된다.
      let savedChatlist = localStorage.getItem("savedChatlist");

      if (!savedChatlist) {
        savedChatlist = [];
      } else {
        savedChatlist = JSON.parse(savedChatlist);
      }

      savedChatlist.push(newChat);

      localStorage.setItem("savedChatlist", JSON.stringify(savedChatlist));

      setChatlist([newChat, ...chatlist]);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-8">
      <form className="flex justify-center" onSubmit={onSubmitChat}>
        {isLoading ? (
          <FaSpinner className="animate-spin-slow" />
        ) : (
          <>
            <input
              className="text-2xl p-2 focus:outline-none rounded-lg border-2 border-pink-200 focus:border-pink-400"
              type="text"
              value={content}
              // disabled={isLoading} isloading으로 로딩 중에는 검색 막는 방법
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            {isLoading ? (
              <FaSpinner />
            ) : (
              <button
                className="flex justify-center items-center ml-4 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-pink-200 bg-pink-400 hover:bg-pink-500"
                type="submit"
              >
                <FaSearch />
                검색
              </button>
            )}
          </>
        )}
      </form>

      <ul className="mt-8 px-4">
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
