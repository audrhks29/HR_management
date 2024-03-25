import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/layout/Header";
import Hr from "./pages/Hr";
import Salary from "./pages/Salary";

const App = () => {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="/hr" index element={<Hr />} />
          <Route path="/salary" index element={<Salary />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;