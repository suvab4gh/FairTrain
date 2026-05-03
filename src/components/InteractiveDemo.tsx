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
    <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
      <h2 className="text-4xl font-black tracking-widest uppercase mb-8 border-b-2 border-white inline-block pb-2">SYS.INIT(CREATOR)</h2>
      
      {regState !== "done" ? (
        <div className="max-w-xl mx-auto p-8 bg-black border-2 border-white space-y-8 shadow-[8px_8px_0_0_#fff]">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">1</span>
              REGISTER DATA
            </h3>
            <p className="text-sm font-bold uppercase mt-2 opacity-80">Publish licensing terms to ENS & Vault to 0G.</p>
          </div>

          <div className="space-y-6">
            <div className="h-32 border-2 border-dashed border-white bg-black flex flex-col items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer font-bold uppercase tracking-widest">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm">[ SELECT CONTENT ]</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest">ENS IDENTITY</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="your-name"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="w-full bg-black border-2 border-white px-4 py-3 text-white placeholder-gray-500 pr-40 focus:outline-none focus:ring-0 focus:border-white font-bold tracking-widest"
                />
                <span className="absolute right-4 top-3 text-white font-bold opacity-50 text-sm pointer-events-none tracking-widest">.CREATOR.ETH</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest">PRICE PER 1000 TOKENS (USDC)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-black border-2 border-white px-4 py-3 text-white focus:outline-none focus:ring-0 focus:border-white font-bold tracking-widest"
              />
            </div>

            <button 
              onClick={startRegistration}
              disabled={regState !== "idle" || !subdomain}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] border-2 border-white hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              {regState === "idle" && "[ PUBLISH TERMS ]"}
              {regState === "uploading" && <><Database className="w-5 h-5 animate-bounce" /> UPLOADING TO 0G...</>}
              {regState === "registering" && <><Link2 className="w-5 h-5 animate-spin-slow" /> WRITING ENS...</>}
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
          <div className="p-6 bg-black border-2 border-white flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-black flex items-center gap-2 text-xl tracking-widest uppercase">
                <CheckCircle className="w-6 h-6" /> OK
              </h3>
              <div className="text-sm font-bold opacity-80 flex flex-col gap-1 tracking-widest uppercase">
                <span>IDENTITY: {subdomain}.CREATOR.ETH</span>
                <span>HASH: 0xA3F912BE7C...</span>
              </div>
            </div>
            {!demoStarted && (
              <button 
                onClick={() => setDemoStarted(true)}
                className="px-6 py-4 bg-white text-black font-black uppercase tracking-widest border-2 border-white hover:bg-black hover:text-white transition-all flex items-center gap-2"
                >
                <Play className="w-5 h-5" /> START PIPELINE
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
      { text: "INIT FAIRTRAIN SDK...", delay: 500, type: "system" },
      { text: `TARGET: 10,000 URLS`, delay: 800, type: "system" },
      { text: `> GET /asset-01.jpg`, delay: 1000, type: "log" },
      { text: `> ENS... ${creatorName}.creator.eth OK`, delay: 600, type: "log" },
      { text: `> ALLOW: TRAINING | ${(price / 1000000).toFixed(6)} USDC/TK`, delay: 500, type: "log" },
      { text: `> TOKENS: 847`, delay: 800, type: "log" },
      { text: `> ESCROW...`, delay: 400, type: "log" },
      { text: `> SEND ${((847 * price) / 1000000).toFixed(6)} USDC -> ${creatorName}`, delay: 1200, type: "tx" },
      { text: `> TX: 0X7C2A9F1 OK`, delay: 500, type: "success" },
      { text: `> 0G AUDIT OK`, delay: 400, type: "success" },
      
      { text: `\n> GET /asset-02.jpg`, delay: 2000, type: "log" },
      { text: `> ENS... ${creatorName}.creator.eth OK`, delay: 600, type: "log" },
      { text: `> ALLOW: TRAINING | ${(price / 1000000).toFixed(6)} USDC/TK`, delay: 500, type: "log" },
      { text: `> TOKENS: 1,203`, delay: 800, type: "log" },
      { text: `> ESCROW...`, delay: 400, type: "log" },
      { text: `> SEND ${((1203 * price) / 1000000).toFixed(6)} USDC -> ${creatorName}`, delay: 1200, type: "tx" },
      { text: `> TX: 0X8D3B2A4 OK`, delay: 500, type: "success" },
      { text: `> 0G AUDIT OK`, delay: 400, type: "success" },
      
      { text: `\n> GET /asset-03.txt`, delay: 2000, type: "log" },
      { text: `> ENS... ${creatorName}.creator.eth OK`, delay: 600, type: "log" },
      { text: `> TOKENS: 512`, delay: 800, type: "log" },
      { text: `> ESCROW...`, delay: 400, type: "log" },
      { text: `> SEND ${((512 * price) / 1000000).toFixed(6)} USDC -> ${creatorName}`, delay: 1200, type: "tx" },
      { text: `> TX: 0X9E4C1F2 OK`, delay: 500, type: "success" },
      { text: `> 0G AUDIT OK`, delay: 400, type: "success" },
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
    <div className="bg-black border-2 border-white overflow-hidden flex flex-col h-[600px] shadow-[8px_8px_0_0_#fff]">
      <div className="bg-white text-black border-b-2 border-white px-4 py-2 flex items-center justify-between font-black tracking-widest uppercase">
        <span>CRAWL.EXE</span>
        <span className="animate-pulse">_</span>
      </div>
      <div ref={scrollRef} className="p-4 overflow-y-auto flex-1 font-mono text-sm leading-relaxed whitespace-pre-wrap uppercase font-bold tracking-widest">
        {logs.map((log) => (
          <motion.div 
            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
            key={log.id} 
            className={cn(
              "mb-1",
              log.type === "system" && "text-white opacity-80",
              log.type === "log" && "text-white opacity-60",
              log.type === "tx" && "text-white",
              log.type === "success" && "text-white"
            )}
          >
            {log.text}
          </motion.div>
        ))}
        {isRunning && (
          <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-3 h-5 bg-white mt-2" />
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
      { delay: 4900, cb: () => { setBalance(prev => prev + a1); addAudit('OAI CORP', 847, a1, '0X7C2A9F1'); } },
      { delay: 12200, cb: () => { setBalance(prev => prev + a2); addAudit('MSTRL AI', 1203, a2, '0X8D3B2A4'); } },
      { delay: 18100, cb: () => { setBalance(prev => prev + a3); addAudit('COHERE', 512, a3, '0X9E4C1F2'); } },
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
      <div className="p-8 bg-black border-2 border-white flex flex-col items-center justify-center relative overflow-hidden shadow-[8px_8px_0_0_#fff]">
        <div className="absolute top-0 right-0 p-4">
          <div className="px-2 py-1 bg-white text-black border border-white font-black text-xs uppercase tracking-widest">
            {creatorName}.CREATOR.ETH
          </div>
        </div>
        <div className="font-black uppercase tracking-widest mb-2 opacity-80 mt-4">WALLET (USDC)</div>
        <div className="text-6xl font-black tracking-tighter text-white tabular-nums flex items-center">
          <span className="opacity-50 mr-2">$</span>
          {balance.toFixed(6)}
        </div>
        {isRunning && (
          <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 bg-white"></span>
            </span>
            LISTENING FOR EVENTS
          </div>
        )}
      </div>

      <div className="flex-1 bg-black border-2 border-white overflow-hidden flex flex-col shadow-[8px_8px_0_0_#fff]">
        <div className="p-4 bg-white text-black border-b-2 border-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <h4 className="font-black tracking-widest uppercase">0G AUDIT.LOG</h4>
        </div>
        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full text-sm text-left min-w-[500px]">
            <thead className="text-xs uppercase bg-black text-white sticky top-0 border-b-2 border-white font-black tracking-widest">
              <tr>
                <th className="px-4 py-3">TIME</th>
                <th className="px-4 py-3">CORP</th>
                <th className="px-4 py-3 text-right">TKNS</th>
                <th className="px-4 py-3 text-right">RCVD</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-white/20 font-bold tracking-widest">
              <AnimatePresence>
                {audits.map((a) => (
                  <motion.tr 
                    key={a.id}
                    initial={{ opacity: 0, backgroundColor: 'white' }}
                    animate={{ opacity: 1, backgroundColor: 'transparent' }}
                    transition={{ duration: 0.5 }}
                    className="uppercase"
                  >
                    <td className="px-4 py-3 opacity-80">{a.time}</td>
                    <td className="px-4 py-3">{a.consumer}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{a.tokens.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right tabular-nums">${a.usd.toFixed(4)}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {audits.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center opacity-50 font-black tracking-widest uppercase">
                    AWAITING DATA
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
