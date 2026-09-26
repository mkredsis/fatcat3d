import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Services from './sections/Services'
import Gallery from './sections/Gallery'
import Process from './sections/Process'
import Materials from './sections/Materials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-coal font-sans text-mist antialiased">
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
    </div>
  )
}
