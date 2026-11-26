import { useEffect, useState } from 'react'
import './App.css'
import Newsify from './components/newsify'
import Settings from './components/settings/Settings'
import { Link, Outlet, Route, Routes } from 'react-router'
import { CiHome, CiSettings } from "react-icons/ci";


function App() {
  const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("data")))
  async function checkData() {
    let data = localData

    if (data === null) {
      const response = await fetch("data.json");
      data = await response.json();

      localStorage.setItem("data", JSON.stringify(data));
      setLocalData(JSON.parse(localStorage.getItem("data")))
    }
  }
  checkData()
  useEffect(() => {
    document.body.classList.toggle(
        "dark-mode",
        localData.settings.darkMode
    );
}, [localData.settings.darkMode]);

useEffect(() => {
  localStorage.setItem("data", JSON.stringify(localData));
}, [localData]);

  function Home() {
    return (
      <Newsify localData={localData} />
    )
  }
  function SettingsPage() {
    return (
      <Settings localData={localData} setLocalData={setLocalData} />
    )
  }
  function Layout() {
    return (
      <>
        <main><Outlet /></main>
        <nav className='nav'>
          <Link to={"/"} className='nav_link'><CiHome />Home</Link>
          <Link to={"/settings"} className='nav_link'> <CiSettings />Settings</Link>
        </nav>
      </>
    )
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
