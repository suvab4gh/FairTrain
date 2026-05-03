import { useState } from 'react';
import PitchDeck from './components/PitchDeck';
import InteractiveDemo from './components/InteractiveDemo';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'pitch' | 'demo'>('pitch');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {view === 'demo' && (
              <button 
                onClick={() => setView('pitch')}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
                title="Back to Overview"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="font-bold text-xl tracking-tight flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-zinc-950" />
              </div>
              FairTrain
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <button 
              onClick={() => setView('pitch')}
              className={`text-sm font-medium transition-colors ${view === 'pitch' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setView('demo')}
              className={`text-sm font-medium transition-colors ${view === 'demo' ? 'text-emerald-400' : 'text-zinc-500 hover:text-emerald-400'}`}
            >
              Launch App
            </button>
          </nav>
        </div>
      </header>

      <main>
        {view === 'pitch' ? (
          <PitchDeck onStartDemo={() => setView('demo')} />
        ) : (
          <InteractiveDemo />
        )}
      </main>
    </div>
  );
}
