import Home from "./Home";
import Navbar from "./Navbar";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main">
        <Home />
      </main>
    </div>
  );
}
