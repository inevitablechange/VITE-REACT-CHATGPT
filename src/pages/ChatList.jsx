import { useEffect, useState } from "react";
import ChatlistCard from "../components/ChatListCard";

const ChatList = () => {
  const [chatlist, setChatlist] = useState([]);

  useEffect(() => {
    const savedChatlist = localStorage.getItem("savedChatlist");

    if (!savedChatlist) return;

    setChatlist(JSON.parse(savedChatlist));
  }, []);

  return (
    <div className="flex flex-col justify-center mt-8">
      <ul className="mt-8 px-4">
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
