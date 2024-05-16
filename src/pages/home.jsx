import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ChatlistCard from "../components/ChatListCard";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState([]);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

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
      const copy = [
        ...chatlist,
        {
          question: content,
          answer: response.data.choices[0].message.content,
        },
      ];

      setChatlist(copy);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(chatlist);
  }, [chatlist]);

  return (
    <div className="flex flex-col justify-center mt-8">
      <form className="flex justify-center" onSubmit={onSubmitChat}>
        <input
          className="text-2xl p-2 focus:outline-none rounded-lg border-2 border-pink-200 focus:border-pink-400"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button
          className="flex justify-center items-center ml-4 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-pink-200 bg-pink-400 hover:bg-pink-500"
          type="submit"
        >
          <FaSearch />
          검색
        </button>
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
