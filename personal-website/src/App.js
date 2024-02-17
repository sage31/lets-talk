import "./App.css";
import ChatWindow from "./components/ChatWindow";
import Header from "./components/Header";

function App() {
  // previously had h-full overflow-y-hidden
  return (
    <div className="App min-h-svh laptop:min-h-screen">
      <Header />
      <ChatWindow />
    </div>
  );
}

export default App;
