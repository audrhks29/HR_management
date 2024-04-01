import { HashRouter, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from "@/components/mode/theme-provider"

import Header from './layout/header/Header'
import Menu from './layout/header/Menu'

import Home from './pages/Home'
import Login from './pages/Login'

import Hr_register from './pages/hr/Hr_register'
import Hr_record from './pages/hr/Hr_record'
import Hr_appointments from './pages/hr/Hr_appointments'
import Hr_organization_chart from './pages/hr/Hr_organization_chart'
import Personal from './pages/hr/record/Personal'

import Salary_status from './pages/salary/Salary_status'
import Salary_history from './pages/salary/Salary_history'

import Attitude_commute_time from './pages/attitude/Attitude_commute_time'
import Attitude_record from './pages/attitude/Attitude_record'

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
            <Route path="/hr_record/:employee_number" element={<Personal />} />
            <Route path="/hr_organization_chart" index element={<Hr_organization_chart />} />
            <Route path="/hr_appointments" index element={<Hr_appointments />} />

            {/* salary */}
            <Route path="/salary_status" index element={<Salary_status />} />
            <Route path="/salary_history" index element={<Salary_history />} />

            {/* attitude */}
            <Route path="/attitude_commute_time" index element={<Attitude_commute_time />} />
            <Route path="/attitude_record" index element={<Attitude_record />} />

            <Route path="/login" index element={<Login />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
