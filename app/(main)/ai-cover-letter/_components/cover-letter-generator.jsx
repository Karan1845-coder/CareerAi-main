"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden bg-background border-[#cca235]/20 shadow-sm group rounded-3xl p-4">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#cca235]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#cca235]/15 transition-all duration-700" />
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl font-bold flex items-center gap-2 text-[#cca235]">
            Target Job Details
          </CardTitle>
          <CardDescription className="text-base">
            Provide the company and role details to generate a highly personalized cover letter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/10 p-6 rounded-2xl border border-white/5">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="font-semibold text-sm">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Google, Stripe, Local Startup"
                  className="h-12 bg-background border-border/50 focus:border-[#cca235] focus:ring-[#cca235]/20 transition-all font-medium"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500 font-medium">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="font-semibold text-sm">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Senior Frontend Engineer"
                  className="h-12 bg-background border-border/50 focus:border-[#cca235] focus:ring-[#cca235]/20 transition-all font-medium"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500 font-medium">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 bg-muted/10 p-6 rounded-2xl border border-white/5">
              <Label htmlFor="jobDescription" className="font-semibold text-sm">Job Description (Optional but recommended)</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the raw job description here... Our AI will analyze the required skills and tone to perfectly match your cover letter."
                className="h-48 bg-background border-border/50 focus:border-[#cca235] focus:ring-[#cca235]/20 transition-all font-medium resize-none leading-relaxed p-4"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={generating} 
                className="bg-[#cca235] text-black hover:bg-[#cca235]/90 hover:shadow-[0_0_20px_rgba(204,162,53,0.4)] transition-all duration-300 rounded-xl h-14 px-8 font-bold text-lg"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  "✨ Generate AI Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
