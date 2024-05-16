const ChatlistCard = ({ question, answer }) => {
  return (
    <>
      <li className="flex justify-end mt-6">
        <div className="bg-indigo-300 p-4 rounded-md text-lg shadow-md max-w-xs">
          {question}
        </div>
      </li>
      <li className="flex justify-start mt-2">
        <div className="bg-gray-200 p-4 rounded-md text-lg shadow-md max-w-xs">
          {answer}
        </div>
      </li>
    </>
  );
};

export default ChatlistCard;
