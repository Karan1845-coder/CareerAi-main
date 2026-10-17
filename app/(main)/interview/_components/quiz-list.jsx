"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="bg-background border border-border/40 shadow-xl rounded-3xl overflow-hidden mt-8">
        <CardHeader className="bg-muted/10 pb-6 border-b border-border/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <CardTitle className="text-3xl md:text-4xl font-bold font-serif text-foreground">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button 
              onClick={() => router.push("/interview/mock")}
              className="h-12 px-6 text-lg font-bold bg-[#cca235] text-black hover:bg-[#cca235]/90 hover:shadow-[0_0_30px_rgba(204,162,53,0.5)] transition-all whitespace-nowrap"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer bg-background border border-[#5bc2e7]/20 hover:border-[#5bc2e7]/60 hover:shadow-[0_0_30px_rgba(91,194,231,0.15)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5bc2e7]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-[#5bc2e7]">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row justify-between w-full mt-2 gap-2 sm:gap-0">
                    <span className="font-semibold text-foreground bg-muted/50 px-3 py-1 rounded-md inline-block">Score: {assessment.quizScore.toFixed(1)}%</span>
                    <span className="text-muted-foreground self-start sm:self-center">
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </span>
                  </CardDescription>
                </CardHeader>
                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
