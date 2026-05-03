import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import PitchDeck from './components/PitchDeck';
import InteractiveDemo from './components/InteractiveDemo';
import AsciiGlobe from './components/AsciiGlobe';

function Navigation() {
  const location = useLocation();
  const isDemo = location.pathname === '/demo';

  return (
    <header className="sticky top-0 z-50 border-b-2 border-white bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isDemo && (
             <Link to="/" className="text-white hover:bg-white hover:text-black transition-colors px-2 py-1 font-bold border border-transparent hover:border-white">
               {"< BACK"}
             </Link>
          )}
          <Link to="/" className="font-bold text-2xl tracking-[0.2em] flex items-center gap-2 uppercase">
             [ FAIRTRAIN ]
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link 
            to="/"
            className={`text-sm font-bold tracking-widest px-2 py-1 transition-colors border ${!isDemo ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            OVERVIEW
          </Link>
          <Link 
            to="/demo"
            className={`text-sm font-bold tracking-widest px-2 py-1 transition-colors border ${isDemo ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            SYS.INIT(DEMO)
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black relative">
        <AsciiGlobe />
        <Navigation />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<PitchDeck />} />
            <Route path="/demo" element={<InteractiveDemo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
