import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Services from './sections/Services'
import Gallery from './sections/Gallery'
import Process from './sections/Process'
import Materials from './sections/Materials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CookieBanner from './components/CookieBanner'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Privacy from './pages/Privacy'

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <Process />
        <Materials />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-coal font-sans text-mist antialiased">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
