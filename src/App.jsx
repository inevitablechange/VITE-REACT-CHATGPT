import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/Layout";
import ChatList from "./pages/ChatList";

const App = () => {
  return (
    <BrowserRouter>
      <div className="max-w-screen-md mx-auto min-h-screen shadow-md">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat-list" element={<ChatList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
