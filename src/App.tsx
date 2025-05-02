import "./index.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Test from "./components/Test";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainLayout />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
