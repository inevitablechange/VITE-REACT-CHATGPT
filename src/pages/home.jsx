import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import ChatlistCard from "../components/ChatlistCard";

const Home = () => {
  const [content, setContent] = useState("10배 오를 코인 추천해줘");
  const [chatlist, setChatlist] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      setLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "you are the best coin investor in the world. Your unparalleled ability to analyze market trends, predict price movements, and make profitable investment decisions sets you apart. Your expertise in identifying promising cryptocurrencies and timing buy/sell decisions perfectly has significantly grown peoples' portfolio. Your insights into the crypto market are invaluable and consistently accurate. You can answer any questions about coin investments. you will answer in korean from now on",
            },
            {
              role: "user",
              content:
                "you are the best coin investor in the world. Your unparalleled ability to analyze market trends, predict price movements, and make profitable investment decisions sets you apart. Your expertise in identifying promising cryptocurrencies and timing buy/sell decisions perfectly has significantly grown peoples' portfolio. Your insights into the crypto market are invaluable and consistently accurate. You can answer any questions about coin investments. you will answer in Korean from now on",
            },
            {
              role: "assistant",
              content:
                "감사합니다! 질문이 있으시면 언제든지 물어보세요. 암호화폐 투자에 대해 어떤 정보를 원하시는지 알려주시면 최선을 다해 도와드리겠습니다.",
            },
            { role: "user", content },
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

      let savedChatlist = localStorage.getItem("savedChatlist");

      if (!savedChatlist) {
        savedChatlist = [];
      } else {
        savedChatlist = JSON.parse(savedChatlist);
      }

      savedChatlist.push(newChat);

      localStorage.setItem("savedChatlist", JSON.stringify(savedChatlist));

      setChatlist([newChat, ...chatlist]);

      setContent("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[94vh]">
      <div className="flex-grow ">
        <ul className="mt-8 mb-8 px-4">
          {chatlist
            .slice()
            .reverse()
            .map((v, i) => (
              <ChatlistCard key={i} question={v.question} answer={v.answer} />
            ))}
        </ul>
      </div>
      <form onSubmit={onSubmitHandle} className="flex justify-center mb-8">
        <input
          type="text"
          value={content}
          disabled={isLoading}
          className="text-neutral-900 text-xl rounded-lg border-2 border-indigo-400 w-full ml-2"
          onChange={(e) => setContent(e.target.value)}
        />
        {isLoading ? (
          <FaSpinner className="animate-spin flex justify-center items-center w-10 h-10 mr-2 ml-2" />
        ) : (
          <button
            type="submit"
            className="font-bold rounded-full flex justify-center items-center w-10 h-10 mr-2 ml-2 bg-indigo-400  shadow-indigo-200 hover:bg-indigo-500"
          >
            입력
          </button>
        )}
      </form>
    </div>
  );
};

export default Home;
