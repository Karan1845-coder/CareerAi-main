"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card className="bg-background border-[#5bc2e7]/20 shadow-sm rounded-3xl p-6 text-center py-16 relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5bc2e7]/5 rounded-full blur-3xl -z-10 group-hover:bg-[#5bc2e7]/10 transition-colors duration-500" />
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#5bc2e7] mb-2">No Cover Letters Yet</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Create your first targeted, AI-powered cover letter to stand out from the crowd!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coverLetters.map((letter) => (
        <Card key={letter.id} className="relative overflow-hidden bg-background border-[#cca235]/20 shadow-sm hover:border-[#cca235]/50 hover:shadow-[0_0_30px_rgba(204,162,53,0.1)] transition-all duration-300 group rounded-3xl p-2 flex flex-col">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#cca235]/10 rounded-full blur-xl group-hover:bg-[#cca235]/20 transition-all duration-500" />
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-[#cca235] line-clamp-1">
                  {letter.jobTitle}
                </CardTitle>
                <div className="text-sm font-semibold text-foreground mt-1">@ {letter.companyName}</div>
                <CardDescription className="text-xs mt-2 font-medium">
                  Created {format(new Date(letter.createdAt), "PPP")}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <AlertDialog>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50 rounded-xl bg-transparent border-border/50 transition-colors"
                    onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 rounded-xl bg-transparent border-border/50 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-red-500/20 bg-background rounded-3xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500">Delete Cover Letter?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your cover letter for <strong>{letter.jobTitle}</strong> at <strong>{letter.companyName}</strong>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-red-500 text-white hover:bg-red-600 rounded-xl"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
              {letter.jobDescription}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
