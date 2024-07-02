import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
function App() {
  return (
    <div >
      <Navbar />
      <div className='max-w-[1300px] my-0 mx-auto relative py-0 px-0 '>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
