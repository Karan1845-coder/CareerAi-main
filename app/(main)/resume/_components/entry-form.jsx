// app/resume/_components/entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Replace handleImproveDescription with this
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', 'education', or 'project'
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 mt-2">
        {entries.map((item, index) => (
          <Card key={index} className="bg-muted/10 border-white/5 hover:border-[#1cdb55]/30 hover:shadow-[0_0_20px_rgba(28,219,85,0.05)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#1cdb55]/50 group-hover:bg-[#1cdb55] transition-colors" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-transparent">
              <CardTitle className="text-base font-bold text-foreground">
                {item.title} <span className="text-muted-foreground font-normal">@ {item.organization}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="hover:bg-red-500/10 hover:text-red-500 rounded-full h-8 w-8"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#1cdb55] mb-2">
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card className="border-[#cca235]/30 bg-[#cca235]/5 shadow-[0_0_40px_rgba(204,162,53,0.1)] mt-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#cca235]/10 rounded-bl-full -z-10" />
          <CardHeader className="pb-4">
            <CardTitle className="text-[#cca235] text-xl font-bold flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Add New {type}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Title/Position</label>
                <Input
                  className="bg-background border-border/50 h-11 focus:border-[#cca235]"
                  placeholder="e.g. Senior Frontend Developer"
                  {...register("title")}
                  error={errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 font-medium">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Organization/Company</label>
                <Input
                  className="bg-background border-border/50 h-11 focus:border-[#cca235]"
                  placeholder="e.g. Google"
                  {...register("organization")}
                  error={errors.organization}
                />
                {errors.organization && (
                  <p className="text-sm text-red-500 font-medium">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Start Date</label>
                <Input
                  type="month"
                  className="bg-background border-border/50 h-11 focus:border-[#cca235]"
                  {...register("startDate")}
                  error={errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500 font-medium">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">End Date</label>
                <Input
                  type="month"
                  className="bg-background border-border/50 h-11 focus:border-[#cca235]"
                  {...register("endDate")}
                  disabled={current}
                  error={errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500 font-medium">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-background p-4 rounded-xl border border-border/50">
              <input
                type="checkbox"
                id="current"
                className="w-4 h-4 accent-[#cca235]"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
              />
              <label htmlFor="current" className="font-medium cursor-pointer">I currently work here</label>
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-semibold">Description</label>
              
              {/* Massive magical AI Suggestion Button! */}
              <div className="absolute right-0 top-0">
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 text-xs border-[#cca235] text-[#cca235] hover:bg-[#cca235] hover:text-black font-bold transition-all shadow-[0_0_15px_rgba(204,162,53,0.2)] rounded-full px-4"
                  onClick={handleImproveDescription}
                  disabled={isImproving || !watch("description")}
                >
                  {isImproving ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                      Improving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1.5" />
                      ✨ Auto-Improve Draft
                    </>
                  )}
                </Button>
              </div>

              <Textarea
                placeholder={`Briefly list your impact or type raw notes, then click "Auto-Improve Draft"!`}
                className="h-40 bg-background border-border/50 focus:border-[#cca235] p-4 text-base leading-relaxed resize-none"
                {...register("description")}
                error={errors.description}
              />
              {errors.description && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4 bg-muted/20 border-t border-border/40 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-muted/50 rounded-xl"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>
            <Button type="button" className="bg-[#cca235] text-black hover:bg-[#cca235]/90 rounded-xl font-bold" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Save Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full h-14 border-dashed border-2 border-[#1cdb55]/40 hover:border-[#1cdb55] bg-transparent hover:bg-[#1cdb55]/10 text-foreground font-semibold rounded-xl text-lg mt-4 transition-all"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-5 w-5 mr-2 text-[#1cdb55]" />
          Add A New {type} Record
        </Button>
      )}
    </div>
  );
}
