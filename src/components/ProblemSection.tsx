
import { CheckCircle2, XCircle, Square, Triangle } from "lucide-react";

export const ProblemSection = () => {
  const problems = [
    "Wasted Time: Staff spend 30% of their day on administrative tasks",
    "Missed Revenue: 85% of customers never call back when unanswered",
    "Limited Online Visibility: Happy clients rarely leave reviews without prompting"
  ];

  return (
    <section className="py-24 bg-brutal-white relative">
      {/* Geometric Pattern Decorations */}
      <div className="absolute top-20 left-10">
        <Square className="w-16 h-16 text-brutal-black" fill="none" strokeWidth={4} />
      </div>
      <div className="absolute bottom-20 right-10 rotate-45">
        <Triangle className="w-20 h-20 text-brutal-black" fill="currentColor" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brutal-black text-center mb-8 font-mono uppercase relative">
            Your front desk staff is overwhelmed with repetitive questions instead of focusing on sales.
            <div className="absolute -left-8 top-0">
              <Square className="w-8 h-8 text-brutal-black -rotate-12" fill="currentColor" />
            </div>
          </h2>
          
          <div className="brutal-card mb-8">
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-brutal-black flex-shrink-0 mt-1" />
                  <span className="text-brutal-black">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="brutal-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🚀</span>
              <h3 className="text-xl font-semibold text-brutal-black font-mono">
                SpaSense AI automation delivers:
              </h3>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-brutal-black flex-shrink-0 mt-1" />
              <span className="text-brutal-black">
                More bookings, fewer no-shows, higher sales & better reviews—with zero extra staff effort.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
