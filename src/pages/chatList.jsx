import ChatlistCard from "../components/ChatlistCard";

const Chatlist = () => {
  let savedChatlist = localStorage.getItem("savedChatlist");
  savedChatlist = JSON.parse(savedChatlist);

  return (
    <ul className="mt-8 px-4">
      {savedChatlist.map((v, i) => (
        <ChatlistCard key={i} question={v.question} answer={v.answer} />
      ))}
    </ul>
  );
};

export default Chatlist;
