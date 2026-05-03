import React from "react";
import { Link } from "react-router-dom";

export default function PitchDeck() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-24 relative z-10">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20">
        <div className="inline-block border-2 border-white px-4 py-1 mb-8 bg-black">
          <span className="font-bold tracking-[0.3em] uppercase animate-pulse inline-block">Status: Automated</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">
          <span className="block border-b-4 border-white pb-4 mb-4">OWN YOUR</span>
          <span className="block">DATA.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed">
          The invisible protocol converting AI consumption into instant royalties.
        </p>
        
        <div className="pt-8 flex justify-center">
          <Link 
            to="/demo"
            className="px-8 py-4 bg-white text-black font-black uppercase tracking-[0.2em] border-2 border-white hover:bg-black hover:text-white transition-all text-xl"
          >
             {">_ EXECUTE DEMO"}
          </Link>
        </div>
      </section>

      {/* Why it is needed */}
      <section className="space-y-12 py-12 border-t-2 border-white mt-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-widest flex items-center gap-4">
            <span className="text-gray-600">{"//"}</span> THE CATALYST
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold tracking-widest uppercase">
          <div className="border-l-4 border-red-600 pl-6 space-y-4 bg-red-950/20 py-4 pr-4">
            <h3 className="text-2xl text-red-500">THE GREAT EXTRACTION</h3>
            <p className="text-gray-400 leading-relaxed">
              AI scrapers are strip-mining the internet. Trillions of tokens of human ingenuity—art, code, literature—are being ingested with zero consent. The foundation of digital knowledge is being commodified while its architects receive nothing.
            </p>
          </div>
          <div className="border-l-4 border-red-600 pl-6 space-y-4 bg-red-950/20 py-4 pr-4">
            <h3 className="text-2xl text-red-500">A FRACTURED SYSTEM</h3>
            <p className="text-gray-400 leading-relaxed">
              Copyright law operates in years; AI trains in milliseconds. 50 million independent creators are defenseless against automated extraction, trapped in a system that demands lawsuits they cannot afford.
            </p>
          </div>
        </div>
      </section>

      {/* Box layout instead of standard Pitch text */}
      <section className="space-y-12 py-12 border-t-2 border-white">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-widest flex items-center gap-4">
            <span className="text-gray-600">{"//"}</span> THE ARCHITECTURE
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-8 border-2 border-white relative space-y-6 group hover:bg-white hover:text-black transition-colors">
              <div className="text-4xl font-black group-hover:text-black text-white">01</div>
              <h4 className="font-black text-xl uppercase tracking-widest">REGISTER</h4>
              <p className="text-sm uppercase font-bold leading-relaxed opacity-80">
                Hash content. Store on 0G. Write terms to ENS text records.
              </p>
            </div>
            
            <div className="bg-black p-8 border-2 border-white relative space-y-6 group hover:bg-white hover:text-black transition-colors">
              <div className="text-4xl font-black group-hover:text-black text-white">02</div>
              <h4 className="font-black text-xl uppercase tracking-widest">DISCOVER</h4>
              <p className="text-sm uppercase font-bold leading-relaxed opacity-80">
                AI pipeline resolves creator.eth. Agrees to pricing per token limit.
              </p>
            </div>
            
            <div className="bg-black p-8 border-2 border-white relative space-y-6 group hover:bg-white hover:text-black transition-colors">
              <div className="text-4xl font-black group-hover:text-black text-white">03</div>
              <h4 className="font-black text-xl uppercase tracking-widest">STREAM</h4>
              <p className="text-sm uppercase font-bold leading-relaxed opacity-80">
                Data consumed. KeeperHub triggers on-chain royalty micropayments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why we are building this */}
      <section className="space-y-12 py-12 border-t-2 border-white">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-widest flex items-center gap-4">
            <span className="text-gray-600">{"//"}</span> THE DIRECTIVE
          </h2>
        </div>
        <div className="bg-white text-black p-8 md:p-12 font-black tracking-widest uppercase text-xl md:text-3xl leading-relaxed mt-4">
          <p>
            DATA IS LABOUR. IT DEMANDS COMPENSATION.
          </p>
          <p className="mt-4 opacity-80 text-lg md:text-2xl">
            We are engineering the basal infrastructure for a post-AGI economy. A protocol where generative models and human creators operate in strict, mathematical symbiosis.
          </p>
        </div>
      </section>

      {/* How it stands out from anything */}
      <section className="space-y-12 py-12 border-t-2 border-white">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-widest flex items-center gap-4">
            <span className="text-gray-600">{"//"}</span> THE UNFAIR ADVANTAGE
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold tracking-widest uppercase">
          <div className="p-6 border-2 border-white hover:bg-white hover:text-black transition-colors">
            <div className="text-xl mb-4 border-b-2 border-current pb-2 font-black">CODE OVER COURTROOMS</div>
            <p className="text-sm opacity-80 leading-relaxed font-bold">
              Lawyers are obsolete here. Licensing and compliance are mathematically enforced via smart contracts, executing without prejudice.
            </p>
          </div>
          <div className="p-6 border-2 border-white hover:bg-white hover:text-black transition-colors">
            <div className="text-xl mb-4 border-b-2 border-current pb-2 font-black">ZERO ABSTRACTION</div>
            <p className="text-sm opacity-80 leading-relaxed font-bold">
              Direct peer-to-peer royalty streaming. The protocol takes zero rent. 100% of the extraction value flows directly to the originator.
            </p>
          </div>
          <div className="p-6 border-2 border-white hover:bg-white hover:text-black transition-colors">
            <div className="text-xl mb-4 border-b-2 border-current pb-2 font-black">MACHINE PROTOCOL</div>
            <p className="text-sm opacity-80 leading-relaxed font-bold">
              Designed for automated crawlers, not human readers. Discovery and negotiation occur programmatically, scaling to billions of requests.
            </p>
          </div>
        </div>
      </section>

      {/* Why it is out of the box thinking */}
      <section className="space-y-12 py-12 border-t-2 border-white">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-widest flex items-center gap-4">
            <span className="text-gray-600">{"//"}</span> THE KNOWN TRUTH
          </h2>
        </div>
        <div className="relative border-2 border-white p-8 md:p-12 overflow-hidden group hover:bg-white hover:text-black transition-colors duration-500">
          <div className="relative z-10 tracking-widest uppercase">
            <h3 className="text-3xl md:text-4xl font-black mb-6">DEFENSIVE WALLS WILL FAIL. PRICING MODELS WON'T.</h3>
            <p className="text-lg md:text-xl font-bold leading-relaxed opacity-90 mb-6">
              The industry is paralyzed by a defensive mindset: building firewalls, updating robots.txt, implementing DRM. But defensive walls always fall to superior models. That is what is known.
            </p>
            <p className="text-lg md:text-xl font-bold leading-relaxed opacity-90">
              <span className="font-black bg-black text-white group-hover:bg-white group-hover:text-black px-2 mr-2 border border-current">THE INVERSION:</span> 
              Instead of blocking the crawlers, we meter them. We are porting AWS-style consumption billing to the entire creative internet. Let them crawl everything—but force them to pay per token.
            </p>
          </div>
        </div>
      </section>

      {/* The Pitch Line */}
      <section className="py-12 px-8 bg-black border-2 border-white text-center mt-12">
        <p className="text-2xl md:text-3xl font-black uppercase leading-relaxed text-white tracking-widest">
           "We didn't build a chatbot. We built the infrastructure that makes the next model legally compliant to train — <span className="border-b-2 border-white">and pays the creators it learned from.</span>"
        </p>
      </section>

    </div>
  );
}
