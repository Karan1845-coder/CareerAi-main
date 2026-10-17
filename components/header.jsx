
import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" aria-label="Sensai home">
          <Image
            src="/logo2.png"
            alt="Sensai Logo"
            width={800}
            height={80}
            className="h-12 w-auto object-contain py-1"
            priority
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Show when="signed-in">
            <>
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 md:inline-flex"
              >
                <Button variant="outline">
                  <LayoutDashboard className="h-4 w-4" />
                  Industry Insights
                </Button>
              </Link>

              <Link href="/dashboard" className="md:hidden">
                <Button variant="ghost" className="h-10 w-10 p-0">
                  <LayoutDashboard className="h-4 w-4" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#cca235]/30 bg-gradient-to-r from-[#cca235]/10 to-[#798bfd]/10 px-4 text-sm font-medium text-foreground transition-all duration-300 hover:from-[#cca235]/20 hover:to-[#798bfd]/20 hover:shadow-[0_0_20px_rgba(204,162,53,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <StarsIcon className="h-4 w-4 text-[#cca235]" />
                  <span className="hidden font-bold md:block">
                    Growth Tools
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="mt-2 w-56 rounded-2xl border border-border/50 bg-background/95 p-2 shadow-[0_0_40px_rgba(121,139,253,0.15)] backdrop-blur-xl"
                >
                  <DropdownMenuItem
                    asChild
                    className="group cursor-pointer rounded-xl py-3 transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:text-foreground"
                  >
                    <Link href="/resume" className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#1cdb55]/10 p-2 transition-colors group-hover:bg-[#1cdb55]/20">
                        <FileText className="h-4 w-4 text-[#1cdb55]" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        Build Resume
                      </span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="group cursor-pointer rounded-xl py-3 transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:text-foreground"
                  >
                    <Link
                      href="/ai-cover-letter"
                      className="flex items-center gap-3"
                    >
                      <div className="rounded-lg bg-[#cca235]/10 p-2 transition-colors group-hover:bg-[#cca235]/20">
                        <PenBox className="h-4 w-4 text-[#cca235]" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        Cover Letter
                      </span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="group cursor-pointer rounded-xl py-3 transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:text-foreground"
                  >
                    <Link
                      href="/interview"
                      className="flex items-center gap-3"
                    >
                      <div className="rounded-lg bg-[#798bfd]/10 p-2 transition-colors group-hover:bg-[#798bfd]/20">
                        <GraduationCap className="h-4 w-4 text-[#798bfd]" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        Interview Prep
                      </span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
            </>
          </Show>

          <Show when="signed-out">
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </Show>
        </div>
      </nav>
    </header>
  );
}
