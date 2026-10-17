"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 relative overflow-hidden bg-background border-[#5bc2e7]/20 hover:border-[#5bc2e7]/50 shadow-[0_0_40px_rgba(91,194,231,0.1)] transition-all duration-500">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#5bc2e7]/10 rounded-bl-full -z-10" />
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={generateQuizFn} 
            className="w-full h-12 text-lg font-bold bg-[#5bc2e7] text-black hover:bg-[#5bc2e7]/80 hover:shadow-[0_0_30px_rgba(91,194,231,0.5)] transition-all"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2 relative overflow-hidden bg-background border-[#798bfd]/20 shadow-[0_0_40px_rgba(121,139,253,0.1)] transition-all duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#798bfd]/10 rounded-bl-full -z-10" />
      <CardHeader>
        <CardTitle className="text-xl text-[#798bfd]">
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        <p className="text-xl font-medium leading-relaxed">{question.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-4"
        >
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-3 p-4 border rounded-xl transition-all duration-300 ${answers[currentQuestion] === option ? 'border-[#798bfd] bg-[#798bfd]/10 shadow-[0_0_15px_rgba(121,139,253,0.2)]' : 'border-border/50 hover:border-[#798bfd]/50 hover:bg-muted/50'}`}
            >
              <RadioGroupItem value={option} id={`option-${index}`} className="border-[#798bfd] text-[#798bfd]" />
              <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-1">{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-6 p-6 bg-[#cca235]/10 border border-[#cca235]/20 rounded-xl relative overflow-hidden shadow-[0_0_20px_rgba(204,162,53,0.1)]">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#cca235]" />
            <p className="font-bold text-[#cca235] mb-2">Explanation</p>
            <p className="text-muted-foreground leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-6 border-t border-border/40">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
            className="border-[#cca235]/50 text-foreground hover:bg-[#cca235]/10 hover:text-[#cca235]"
          >
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto bg-[#798bfd] text-white hover:bg-[#798bfd]/90 hover:shadow-[0_0_20px_rgba(121,139,253,0.4)] transition-all font-semibold"
        >
          {savingResult && (
            <BarLoader className="mr-2" width={20} color="white" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
