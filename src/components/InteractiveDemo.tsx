import { useState, useEffect, useRef } from "react";
import { Upload, Link2, ShieldCheck, Play, CheckCircle, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

type RegState = "idle" | "uploading" | "registering" | "done";

export default function InteractiveDemo() {
  const [regState, setRegState] = useState<RegState>("idle");
  const [subdomain, setSubdomain] = useState("");
  const [price, setPrice] = useState(100);
  const [demoStarted, setDemoStarted] = useState(false);

  const startRegistration = () => {
    if (!subdomain) return;
    setRegState("uploading");
    setTimeout(() => setRegState("registering"), 1500);
    setTimeout(() => setRegState("done"), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Creator Dashboard</h2>
      
      {regState !== "done" ? (
        <div className="max-w-xl mx-auto p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-8">
          <div>
            <h3 className="text-xl font-semibold">1. Register your work</h3>
            <p className="text-sm text-zinc-400 mt-1">Publish licensing terms to ENS and secure on 0G.</p>
          </div>

          <div className="space-y-4">
            <div className="h-32 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 hover:border-zinc-500 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mb-2" />
              <span className="text-sm">Upload creative work (Image, PDF, Code)</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Identity</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="your-name"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 pr-32"
                />
                <span className="absolute right-4 top-3 text-zinc-500 font-mono text-sm pointer-events-none">.creator.eth</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Price per 1000 tokens (USDC micro)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <button 
              onClick={startRegistration}
              disabled={regState !== "idle" || !subdomain}
              className="w-full py-4 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
            >
              {regState === "idle" && "Register + Publish terms"}
              {regState === "uploading" && <><Database className="w-4 h-4 animate-bounce" /> Uploading to 0G...</>}
              {regState === "registering" && <><Link2 className="w-4 h-4 animate-spin-slow" /> Writing ENS Terms...</>}
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Post Registration Success */}
          <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex items-center justify-between">
            <div>
              <h3 className="text-emerald-400 font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Successfully registered
              </h3>
              <div className="mt-2 text-sm font-mono text-zinc-400 flex flex-col gap-1">
                <span>ENS Identity : {subdomain}.creator.eth</span>
                <span>Content Hash : 0xa3f912be7c...</span>
              </div>
            </div>
            {!demoStarted && (
              <button 
                onClick={() => setDemoStarted(true)}
                className="px-6 py-3 bg-emerald-500 text-zinc-950 font-semibold rounded-lg flex items-center gap-2 hover:bg-emerald-400 transition-colors"
                >
                <Play className="w-4 h-4" /> Start AI Pipeline Demo
              </button>
            )}
          </div>

          {/* Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Terminal isRunning={demoStarted} creatorName={subdomain} price={price} />
            <Earnings isRunning={demoStarted} creatorName={subdomain} price={price} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// AI PIPELINE SIMULATOR (LEFT SIDE)
// -----------------------------------------------------------------------------

type EventLog = { id: string; text: string; type: "log" | "success" | "tx" | "system" };

function Terminal({ isRunning, creatorName, price }: { isRunning: boolean, creatorName: string, price: number }) {
  const [logs, setLogs] = useState<EventLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRunning) return;

    let isMounted = true;
    let sequence = [
      { text: "Initializing FairTrain Pipeline SDK...", delay: 500, type: "system" },
      { text: `Targeting 10,000 URLs for ingestion`, delay: 800, type: "system" },
      { text: `> Fetching https://creators-portfolio.com/asset-01.jpg`, delay: 1000, type: "log" },
      { text: `> Resolving ENS... ${creatorName}.creator.eth found`, delay: 600, type: "log" },
      { text: `> Terms: training allowed · ${(price / 1000000).toFixed(6)} USDC/token`, delay: 500, type: "log" },
      { text: `> Extracting: 847 tokens`, delay: 800, type: "log" },
      { text: `> Triggering KeeperHub Escrow...`, delay: 400, type: "log" },
      { text: `> Paying ${((847 * price) / 1000000).toFixed(6)} USDC to ${creatorName}.creator.eth...`, delay: 1200, type: "tx" },
      { text: `> ✓ TX: 0x7c2a9f1 confirmed`, delay: 500, type: "success" },
      { text: `> ✓ 0G audit log appended`, delay: 400, type: "success" },
      
      { text: `\n> Fetching https://creators-portfolio.com/asset-02.jpg`, delay: 2000, type: "log" },
      { text: `> Resolving ENS... ${creatorName}.creator.eth found`, delay: 600, type: "log" },
      { text: `> Terms: training allowed · ${(price / 1000000).toFixed(6)} USDC/token`, delay: 500, type: "log" },
      { text: `> Extracting: 1,203 tokens`, delay: 800, type: "log" },
      { text: `> Triggering KeeperHub Escrow...`, delay: 400, type: "log" },
      { text: `> Paying ${((1203 * price) / 1000000).toFixed(6)} USDC to ${creatorName}.creator.eth...`, delay: 1200, type: "tx" },
      { text: `> ✓ TX: 0x8d3b2a4 confirmed`, delay: 500, type: "success" },
      { text: `> ✓ 0G audit log appended`, delay: 400, type: "success" },
      
      { text: `\n> Fetching https://creators-portfolio.com/asset-03.txt`, delay: 2000, type: "log" },
      { text: `> Resolving ENS... ${creatorName}.creator.eth found`, delay: 600, type: "log" },
      { text: `> Extracting: 512 tokens`, delay: 800, type: "log" },
      { text: `> Triggering KeeperHub Escrow...`, delay: 400, type: "log" },
      { text: `> Paying ${((512 * price) / 1000000).toFixed(6)} USDC to ${creatorName}.creator.eth...`, delay: 1200, type: "tx" },
      { text: `> ✓ TX: 0x9e4c1f2 confirmed`, delay: 500, type: "success" },
      { text: `> ✓ 0G audit log appended`, delay: 400, type: "success" },
    ];

    let currentIdx = 0;
    const executeNext = () => {
      if (!isMounted || currentIdx >= sequence.length) return;
      const step = sequence[currentIdx];
      
      setLogs((prev) => [...prev, { id: Math.random().toString(), text: step.text, type: step.type as any }]);
      currentIdx++;
      
      if (currentIdx < sequence.length) {
        setTimeout(executeNext, sequence[currentIdx].delay);
      }
    };

    executeNext();
    return () => { isMounted = false; };
  }, [isRunning, creatorName, price]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-xl bg-black border border-zinc-800 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <span className="ml-4 text-xs font-mono text-zinc-500">pipeline/crawl.ts</span>
      </div>
      <div ref={scrollRef} className="p-4 overflow-y-auto flex-1 font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {logs.map((log) => (
          <motion.div 
            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
            key={log.id} 
            className={cn(
              "mb-1",
              log.type === "system" && "text-blue-400",
              log.type === "log" && "text-zinc-400",
              log.type === "tx" && "text-emerald-400 font-semibold",
              log.type === "success" && "text-emerald-500/80"
            )}
          >
            {log.text}
          </motion.div>
        ))}
        {isRunning && (
          <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-zinc-500 mt-2" />
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// EARNINGS & AUDIT DASHBOARD (RIGHT SIDE)
// -----------------------------------------------------------------------------

function Earnings({ isRunning, creatorName, price }: { isRunning: boolean, creatorName: string, price: number }) {
  const [balance, setBalance] = useState(0);
  const [audits, setAudits] = useState<{ id: string, time: string, consumer: string, tokens: number, usd: number, tx: string }[]>([]);

  // Synchronized to match the terminal outputs
  useEffect(() => {
    if (!isRunning) return;
    let isMounted = true;
    
    // Calculate exact amounts
    const a1 = (847 * price) / 1000000;
    const a2 = (1203 * price) / 1000000;
    const a3 = (512 * price) / 1000000;

    const events = [
      { delay: 4900, cb: () => { setBalance(prev => prev + a1); addAudit('OpenAI Corp', 847, a1, '0x7c2a9f1'); } },
      { delay: 12200, cb: () => { setBalance(prev => prev + a2); addAudit('Mistral AI', 1203, a2, '0x8d3b2a4'); } },
      { delay: 18100, cb: () => { setBalance(prev => prev + a3); addAudit('Cohere Inc', 512, a3, '0x9e4c1f2'); } },
    ];

    const addAudit = (consumer: string, tokens: number, usd: number, tx: string) => {
      setAudits(prev => [{
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        consumer, tokens, usd, tx
      }, ...prev]);
    };

    const timeouts = events.map(e => setTimeout(() => {
      if (isMounted) e.cb();
    }, e.delay));

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [isRunning, price]);

  return (
    <div className="flex flex-col gap-6 h-[600px]">
      <div className="p-8 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-zinc-500">
            {creatorName}.creator.eth
          </div>
        </div>
        <div className="text-zinc-400 font-medium mb-2">Total Earned</div>
        <div className="text-6xl font-bold font-mono tracking-tighter text-white tabular-nums flex items-center">
          <span className="text-zinc-500 mr-2">$</span>
          {balance.toFixed(6)}
        </div>
        {isRunning && (
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Waiting for consumption events...
          </div>
        )}
      </div>

      <div className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <h4 className="font-semibold">0G Immutable Audit Trail</h4>
        </div>
        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full text-sm text-left min-w-[500px]">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-950 sticky top-0">
              <tr>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Consumer</th>
                <th className="px-4 py-3 font-medium text-right">Tokens</th>
                <th className="px-4 py-3 font-medium text-right">Paid</th>
                <th className="px-4 py-3 font-medium">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <AnimatePresence>
                {audits.map((a) => (
                  <motion.tr 
                    key={a.id}
                    initial={{ opacity: 0, backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
                    animate={{ opacity: 1, backgroundColor: 'transparent' }}
                    transition={{ duration: 1 }}
                    className="font-mono"
                  >
                    <td className="px-4 py-3 text-zinc-400">{a.time}</td>
                    <td className="px-4 py-3 text-zinc-300">{a.consumer}</td>
                    <td className="px-4 py-3 text-zinc-400 text-right tabular-nums">{a.tokens.toLocaleString()}</td>
                    <td className="px-4 py-3 text-emerald-400 text-right tabular-nums">${a.usd.toFixed(4)}</td>
                    <td className="px-4 py-3 text-indigo-400">{a.tx}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {audits.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500 font-sans">
                    No consumption events recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
