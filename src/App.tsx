import "./App.css";
import ChatWindow from "./components/ChatWindow";
import Header from "./components/Header";

function App() {
  return (
    <div className="App flex max-h-svh min-h-svh flex-col laptop:max-h-screen laptop:min-h-screen">
      <Header />
      <ChatWindow />
    </div>
  );
}

export default App;
