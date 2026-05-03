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

      {/* Box layout instead of standard Pitch text */}
      <section className="space-y-12 py-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase border-b-2 border-white inline-block pb-2 tracking-widest">ARCHITECTURE</h2>
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

      {/* The Pitch Line */}
      <section className="py-12 px-8 bg-black border-2 border-white text-center">
        <p className="text-2xl md:text-3xl font-black uppercase leading-relaxed text-white tracking-widest">
           "We didn't build a chatbot. We built the infrastructure that makes the next model legally compliant to train — <span className="border-b-2 border-white">and pays the creators it learned from.</span>"
        </p>
      </section>

    </div>
  );
}
