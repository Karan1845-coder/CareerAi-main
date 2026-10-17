import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Average Score Card (Gold Vibe) */}
      <Card className="relative overflow-hidden bg-background border-[#cca235]/20 hover:border-[#cca235]/60 hover:shadow-[0_0_40px_rgba(204,162,53,0.15)] transition-all duration-500 group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#cca235]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className="h-5 w-5 text-[#cca235]" />
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-3xl font-bold font-serif text-[#cca235]">{getAverageScore()}%</div>
          <p className="text-sm text-muted-foreground mt-1">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      {/* Questions Practiced Card (Purple Vibe) */}
      <Card className="relative overflow-hidden bg-background border-[#798bfd]/20 hover:border-[#798bfd]/60 hover:shadow-[0_0_40px_rgba(121,139,253,0.15)] transition-all duration-500 group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#798bfd]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <Brain className="h-5 w-5 text-[#798bfd]" />
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-3xl font-bold font-serif text-[#798bfd]">{getTotalQuestions()}</div>
          <p className="text-sm text-muted-foreground mt-1">Total questions</p>
        </CardContent>
      </Card>

      {/* Latest Score Card (Cyan Vibe) */}
      <Card className="relative overflow-hidden bg-background border-[#5bc2e7]/20 hover:border-[#5bc2e7]/60 hover:shadow-[0_0_40px_rgba(91,194,231,0.15)] transition-all duration-500 group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5bc2e7]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <Target className="h-5 w-5 text-[#5bc2e7]" />
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-3xl font-bold font-serif text-[#5bc2e7]">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
