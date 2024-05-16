import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [content, setContent] = useState("");

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: "오늘 점심 추천해줘",
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <form className="flex" onSubmit={onSubmitChat}>
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
    </div>
  );
};

export default Home;
