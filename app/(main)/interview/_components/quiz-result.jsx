"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-8 bg-background border border-border/40 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#cca235]/10 rounded-bl-full -z-10" />
        
        {/* Score Overview */}
        <div className="text-center space-y-4">
          <h3 className="text-5xl font-extrabold font-serif text-[#cca235] drop-shadow-sm">{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className="w-full h-3" />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-[#5bc2e7]/10 border border-[#5bc2e7]/20 p-6 rounded-2xl relative overflow-hidden shadow-[0_0_20px_rgba(91,194,231,0.1)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5bc2e7]" />
            <p className="font-bold text-[#5bc2e7] mb-2 text-lg">Focus Area</p>
            <p className="text-muted-foreground leading-relaxed text-base">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl flex items-center gap-2">
            Detailed Review
          </h3>
          {result.questions.map((q, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-2xl p-6 space-y-4 transition-all duration-300 relative overflow-hidden ${q.isCorrect ? 'border-[#1cdb55]/30 bg-[#1cdb55]/5 hover:shadow-[0_0_20px_rgba(28,219,85,0.1)]' : 'border-red-500/30 bg-red-500/5 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]'}`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${q.isCorrect ? 'bg-[#1cdb55]' : 'bg-red-500'}`} />
              <div className="flex items-start justify-between gap-4">
                <p className="font-semibold text-lg text-foreground">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-[#1cdb55] flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm font-medium space-y-1">
                <p className={`${q.isCorrect ? 'text-[#1cdb55]' : 'text-red-400'}`}>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p className="text-[#1cdb55]">Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-background border border-border/50 p-4 rounded-xl mt-2">
                <p className="font-bold mb-1 text-foreground">Explanation</p>
                <p className="text-muted-foreground">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="pt-6">
          <Button 
            onClick={onStartNew} 
            className="w-full h-12 text-lg font-bold bg-[#cca235] text-black hover:bg-[#cca235]/90 hover:shadow-[0_0_30px_rgba(204,162,53,0.5)] transition-all"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
