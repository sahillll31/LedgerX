import { GlowCard } from "@/components/ui/spotlight-card";
import { Shield, BarChart3, Sparkles } from "lucide-react";

export function Default() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-8 gap-12 font-sans">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">LedgerX Premium Services</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Experience the future of financial intelligence with our interactive, AI-driven dashboard.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 max-w-7xl">
        {/* Card 1: Blue - Tax Consulting */}
        <GlowCard glowColor="blue" size="lg" className="flex flex-col">
          <div className="h-full flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Shield className="text-blue-400 w-6 h-6" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400" 
                alt="Tax" 
                className="w-full h-32 object-cover rounded-lg opacity-80"
              />
              <h3 className="text-xl font-semibold text-white">ITR FastTrack</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Automated income tax filings for professionals and businesses. Optimized for deduction maximization.
              </p>
            </div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium">
              Start Filing
            </button>
          </div>
        </GlowCard>

        {/* Card 2: Purple - Audit Analytics */}
        <GlowCard glowColor="purple" size="lg" className="flex flex-col">
          <div className="h-full flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="text-purple-400 w-6 h-6" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" 
                alt="Audit" 
                className="w-full h-32 object-cover rounded-lg opacity-80"
              />
              <h3 className="text-xl font-semibold text-white">Smart Audit</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Real-time anomaly detection and ledger verification using our proprietary ML algorithms.
              </p>
            </div>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-sm font-medium">
              Run Analysis
            </button>
          </div>
        </GlowCard>

        {/* Card 3: Orange - AI Desk */}
        <GlowCard glowColor="orange" size="lg" className="flex flex-col">
          <div className="h-full flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="text-orange-400 w-6 h-6" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400" 
                alt="AI" 
                className="w-full h-32 object-cover rounded-lg opacity-80"
              />
              <h3 className="text-xl font-semibold text-white">LLM Legal Desk</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Instant answers to complex tax compliance questions powered by Groq Llama-3 precision.
              </p>
            </div>
            <button className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors text-sm font-medium">
              Open TaxBot
            </button>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
