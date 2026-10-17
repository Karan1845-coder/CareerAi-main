"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

export default function ResumeBuilder({ initialContent, initialFormData }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  useEffect(() => {
    if (initialFormData) {
      reset(initialFormData);
    }
  }, [initialFormData, reset]);

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      await saveResumeFn(previewContent, formValues);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div data-color-mode="light" className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-background border border-border/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#798bfd]/10 rounded-full blur-[80px] -z-10" />
        <h1 className="font-extrabold gradient-title text-4xl md:text-5xl flex items-center gap-3">
          <Edit className="h-10 w-10 text-[#798bfd]" />
          Resume Builder
        </h1>
        <div className="space-x-4 flex items-center">
          <Button
            variant="outline"
            className="border-[#1cdb55]/30 hover:border-[#1cdb55] hover:bg-[#1cdb55]/10 hover:text-[#1cdb55] transition-colors rounded-xl h-12 px-6"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </>
            )}
          </Button>
          <Button 
            className="bg-[#798bfd] hover:bg-[#798bfd]/90 hover:shadow-[0_0_20px_rgba(121,139,253,0.4)] transition-all rounded-xl h-12 px-6 text-white font-bold" 
            onClick={generatePDF} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="edit" className="rounded-lg px-8 font-medium data-[state=active]:bg-[#5bc2e7]/10 data-[state=active]:text-[#5bc2e7] transition-all">Editor Form</TabsTrigger>
          <TabsTrigger value="preview" className="rounded-lg px-8 font-medium data-[state=active]:bg-[#cca235]/10 data-[state=active]:text-[#cca235] transition-all">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-6">
            {/* Contact Information */}
            <div className="space-y-4 bg-background border border-[#cca235]/20 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-[#cca235]/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#cca235]/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#cca235]">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/10 p-6 rounded-2xl border border-white/5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email Address</label>
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="your@email.com"
                    className="h-12 bg-background border-border/50 focus:border-[#cca235] focus:ring-[#cca235]/20"
                    error={errors.contactInfo?.email}
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500 font-medium">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Mobile Number</label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    className="h-12 bg-background border-border/50 focus:border-[#cca235] focus:ring-[#cca235]/20"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500 font-medium">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">LinkedIn Profile</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    className="h-12 bg-background border-border/50 focus:border-[#cca235] focus:ring-[#cca235]/20"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500 font-medium">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Twitter / Portfolio Link
                  </label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    className="h-12 bg-background border-border/50 focus:border-[#cca235] focus:ring-[#cca235]/20"
                    placeholder="https://twitter.com/your-handle"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500 font-medium">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4 bg-background border border-[#5bc2e7]/20 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-[#5bc2e7]/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5bc2e7]/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#5bc2e7]">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-40 bg-muted/10 border-border/50 focus:border-[#5bc2e7] focus:ring-[#5bc2e7]/20 rounded-2xl p-4 text-base leading-relaxed resize-none"
                    placeholder="Write a compelling professional summary that highlights your impact..."
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500 font-medium">{errors.summary.message}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-4 bg-background border border-[#798bfd]/20 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-[#798bfd]/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#798bfd]/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#798bfd]">Key Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32 bg-muted/10 border-border/50 focus:border-[#798bfd] focus:ring-[#798bfd]/20 rounded-2xl p-4 text-base leading-relaxed resize-none"
                    placeholder="List your key skills, programming languages, tools... e.g. React.js, Python, System Architecture"
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500 font-medium">{errors.skills.message}</p>
              )}
            </div>

            {/* Experience */}
            <div className="space-y-4 bg-background border border-[#1cdb55]/20 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-[#1cdb55]/40 transition-colors">
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#1cdb55]">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-4 bg-background border border-[#ff9100]/20 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-[#ff9100]/40 transition-colors">
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#ff9100]">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.education.message}
                </p>
              )}
            </div>

            {/* Projects */}
            <div className="space-y-4 bg-background border border-[#cca235]/20 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-[#cca235]/40 transition-colors">
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#cca235]">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.projects.message}
                </p>
              )}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
