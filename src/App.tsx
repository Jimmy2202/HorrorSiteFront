import "./index.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Test from "./components/Test";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainLayout />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
