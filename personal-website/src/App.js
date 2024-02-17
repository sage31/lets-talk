import "./App.css";
import ChatWindow from "./components/ChatWindow";
import Header from "./components/Header";

function App() {
  return (
    <div className="App h-full overflow-y-hidden">
      <Header />
      <ChatWindow />
    </div>
  );
}

export default App;
