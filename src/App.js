import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Questions from "./Questions";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
