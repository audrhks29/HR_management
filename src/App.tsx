import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Hr from './pages/Hr'
import Salary from './pages/Salaly'
import Header from './components/layout/header/Header'
import { ThemeProvider } from "@/components/mode/theme-provider"
function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/hr" index element={<Hr />} />
            <Route path="/salary" index element={<Salary />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </>
  )
}

export default App
