import { Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@/components/mode/theme-provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

import Header from "./layout/header/Header";
import Frame from "./layout/header/Frame";
import Menu from "./layout/header/Menu";

import Home from "./pages/Home";

import Hr_register from "./pages/hr/Hr_register";
import Hr_record from "./pages/hr/Hr_record";
import Hr_organization_chart from "./pages/hr/Hr_organization_chart";
import Personal from "./pages/hr/record/Personal";

import Salary_status from "./pages/salary/Salary_status";
import Salary_history from "./pages/salary/Salary_history";

import Attitude_commute_time from "./pages/attitude/Attitude_commute_time";
import Attitude_record from "./pages/attitude/Attitude_record";

import Salary_registration from "./pages/salary/Salary_registration";
import Salary_edit from "./pages/salary/Salary_edit";

import Salary_history_personal from "./window/Salary_history_personal";
import Post from "./components/hr/register/menu/info/Post";

import Loading from "./shared/Loading";

import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";

import Setting from "./pages/setting/Setting";
import useDateStore from "./store/date-store";
import { Toaster } from "./components/ui/toaster";

function App() {
  const { setToday } = useDateStore();

  useEffect(() => {
    setToday();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <HashRouter>
          <Frame />
          <Header />

          <div className="flex justify-around">
            <Menu />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" index element={<Login />} />
                <Route path="/signup" index element={<SignUp />} />
                {/* <Route path="/" index element={<Test />} /> */}
                <Route path="/home" element={<Home />} />

                {/* hr */}
                <Route path="/hr_register" element={<Hr_register />} />
                <Route path="/hr_record" element={<Hr_record />} />
                <Route path="/hr_record/:employee_number" element={<Personal />} />
                <Route path="/hr_organization_chart" index element={<Hr_organization_chart />} />

                {/* salary */}
                <Route path="/salary_status" index element={<Salary_status />} />
                <Route path="/salary_status/:employee_number" index element={<Salary_status />} />
                <Route path="/salary_registration" index element={<Salary_registration />} />
                <Route path="/salary_registration/:employee_number" index element={<Salary_registration />} />
                <Route path="/salary_edit" index element={<Salary_edit />} />
                <Route path="/salary_edit/:employee_number" index element={<Salary_edit />} />
                <Route path="/salary_history" index element={<Salary_history />} />
                <Route path="/salary_history/:employee_number" index element={<Salary_history />} />
                <Route
                  path="/salary_history_personal/:employee_number/:year/:month"
                  index
                  element={<Salary_history_personal />}
                />

                {/* attitude */}
                <Route path="/attitude_commute_time" index element={<Attitude_commute_time />} />
                <Route path="/attitude_record" index element={<Attitude_record />} />

                <Route path="/post" index element={<Post />} />
                <Route path="/setting" index element={<Setting />} />
              </Routes>
            </Suspense>
          </div>
          <Toaster />
        </HashRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
