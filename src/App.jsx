import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Chatlist from "./pages/chatlist";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen max-w-screen-md mx-auto bg-indigo-100 flex flex-col">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat-list" element={<Chatlist />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
