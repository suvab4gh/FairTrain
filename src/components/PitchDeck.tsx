import { ArrowRight, CheckCircle2, Shield, Zap, Database, Globe } from "lucide-react";
import { cn } from "../lib/utils";

export default function PitchDeck({ onStartDemo }: { onStartDemo: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
      {/* Hero Section */}
      <section className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-mono text-zinc-400 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          New Concept · Untouched Market · 3 Partners
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">FairTrain</h1>
        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
          The protocol that turns AI training data into a royalty-generating asset.{" "}
          <span className="text-zinc-200 font-medium">Automatically.</span>
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStartDemo}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold rounded-lg transition-all flex items-center gap-2"
          >
            Launch Interactive Demo <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-6">
          <h3 className="text-xl font-semibold text-red-400 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-400/10 flex items-center justify-center text-red-400">×</span>
            Today
          </h3>
          <ul className="space-y-6 text-zinc-400">
            <li className="flex gap-4">
              <span className="font-mono text-zinc-600">01</span>
              <span>AI scrapers download 5 trillion tokens of creative work — art, writing, code, music — with no consent mechanism.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-zinc-600">02</span>
              <span>Creators have no way to publish machine-readable terms that AI pipelines can programmatically discover.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-zinc-600">03</span>
              <span>Royalties require lawsuits lasting years — the 50M+ small creators never see a cent.</span>
            </li>
          </ul>
        </div>
        
        <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 space-y-6">
          <h3 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center text-emerald-400">✓</span>
            With FairTrain
          </h3>
          <ul className="space-y-6 text-zinc-300">
            <li className="flex gap-4">
              <span className="font-mono text-emerald-600/50">01</span>
              <span>Creator registers work hash on 0G and publishes licensing terms to their ENS identity — discoverable by any AI pipeline.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-emerald-600/50">02</span>
              <span>AI company's training crawler queries ENS before ingesting content, discovers terms and price per token automatically.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-emerald-600/50">03</span>
              <span>KeeperHub streams royalty payment to the creator's ENS address the moment training data is consumed — no invoicing, no delay.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section className="space-y-8">
        <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest text-center">Load-Bearing Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            icon={<Database className="text-indigo-400" />}
            title="0G Storage + Compute"
            desc="Immutable content registry and sealed provenance verification."
            reveal="Removing 0G breaks the entire trust model. A centralised database can be silenced, edited, or seized. Sealed compute lets you verify content ownership without exposing the raw file."
          />
          <Card 
            icon={<Globe className="text-blue-400" />}
            title="ENS"
            desc="Creator identity + machine-readable licensing marketplace."
            reveal="Removing ENS removes discoverability. ENS text records become the licensing API — price per token, allowed use cases, directly queryable without a middleman."
          />
          <Card 
            icon={<Zap className="text-amber-400" />}
            title="KeeperHub"
            desc="Autonomous, milestone-triggered royalty execution."
            reveal="Removing KeeperHub means creators still wait for payment. KeeperHub's retry logic and gas optimisation are existential for high-frequency micropayments at training scale."
          />
        </div>
      </section>

      {/* The Pitch Line */}
      <section className="py-12 px-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
        <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-zinc-300">
          "We didn't build a chatbot. We built the infrastructure that makes the next GPT-6 legally compliant to train — <span className="text-emerald-400">and pays the 50 million creators it learned from, automatically, in milliseconds.</span>"
        </p>
      </section>

    </div>
  );
}

function Card({ icon, title, desc, reveal }: { icon: React.ReactNode, title: string, desc: string, reveal: string }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800">
        {icon}
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-zinc-400 text-sm">{desc}</p>
      <div className="p-4 rounded bg-zinc-950/50 border border-zinc-800/50 text-sm font-mono text-zinc-500 leading-relaxed">
        {reveal}
      </div>
    </div>
  );
}
