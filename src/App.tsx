import { HashRouter, Route, Routes } from 'react-router-dom'

import Header from './layout/header/Header'

import Home from './pages/Home'
import Hr_register from './pages/hr/Hr_register'
import Hr_record from './pages/hr/Hr_record'
import Salary from './pages/Salary'
import Login from './pages/Login'

import { ThemeProvider } from "@/components/mode/theme-provider"
import Hr_appointments from './pages/hr/Hr_appointments'
import Hr_organization_chart from './pages/hr/Hr_organization_chart'
import Menu from './layout/header/Menu'

function App() {

  return (
    <div className='grid grid-cols-[250px_1fr]'>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HashRouter>
          <Header />
          <Menu />
          <Routes>
            <Route path="/" index element={<Home />} />

            {/* hr */}
            <Route path="/hr_register" index element={<Hr_register />} />
            <Route path="/hr_record" index element={<Hr_record />} />
            <Route path="/hr_organization_chart" index element={<Hr_organization_chart />} />
            <Route path="/hr_appointments" index element={<Hr_appointments />} />

            {/* salary */}
            <Route path="/salary" index element={<Salary />} />
            <Route path="/login" index element={<Login />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
