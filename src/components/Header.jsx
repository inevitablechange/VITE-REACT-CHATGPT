import { Link, useLocation } from "react-router-dom";
import React from "react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex justify-center items-center gap-8 py-5 shadow-md min-h-[6vh]">
      <Link
        to="/"
        className={`text-indigo-400 ${
          location.pathname == "/" && "text-indigo-900 font-bold"
        }`}
      >
        코인GPT와 대화하기
      </Link>
      <Link
        to="/chat-list"
        className={`text-indigo-400 ${
          location.pathname == "/chat-list" && "text-indigo-900 font-bold"
        }`}
      >
        대화 기록
      </Link>
    </header>
  );
};

export default Header;
