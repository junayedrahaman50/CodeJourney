import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import "./styles.css";
import Notes from "./Notes";
import WaitList from "./WaitList";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="*" element={<WaitList />}></Route>
            {/* <Route path="/" element={<Home />}></Route> */}
            {/* <Route path="/notes/:id" element={<Notes />}></Route> */}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
