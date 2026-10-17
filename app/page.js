import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
  Code2,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import InterviewRoadmaps from "@/app/(main)/interview/_components/interview-roadmaps";
import AnimatedWords from "@/components/animated-words";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16">
            Powerful Features for Your <span className="text-[#5bc2e7] italic font-serif">Career Growth</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border/50 bg-background hover:border-[#5bc2e7]/50 hover:shadow-[0_0_30px_rgba(91,194,231,0.2)] hover:-translate-y-2 transition-all duration-500"
              >
                <CardContent className="pt-8 text-center flex flex-col items-center group">
                  <div className="flex flex-col items-center justify-center">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 mt-2 group-hover:text-[#5bc2e7] transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmaps Section */}
      <section className="w-full py-12 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <InterviewRoadmaps />
        </div>
      </section>

      {/* Premium Advanced Stats Section */}
      <section className="w-full py-20 md:py-32 bg-transparent relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#cca235]/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#798bfd]/5 rounded-full blur-[100px] -translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Stat Row 1 */}
            <div className="group relative bg-background/50 backdrop-blur-md border border-white/5 shadow-2xl p-8 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-[#cca235]/40 hover:shadow-[0_0_40px_rgba(204,162,53,0.15)] flex flex-col items-center justify-center text-center">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#cca235]/10 rounded-full blur-2xl group-hover:bg-[#cca235]/20 transition-all duration-500" />
              <h3 className="text-5xl md:text-6xl font-extrabold text-[#cca235] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#cca235] to-[#f5d576] drop-shadow-sm mb-2">50+</h3>
              <p className="text-muted-foreground font-semibold tracking-wide uppercase text-sm">Industries Covered</p>
            </div>
            
            {/* Stat Row 2 */}
            <div className="group relative bg-background/50 backdrop-blur-md border border-white/5 shadow-2xl p-8 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-[#1cdb55]/40 hover:shadow-[0_0_40px_rgba(28,219,85,0.15)] flex flex-col items-center justify-center text-center">
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#1cdb55]/10 rounded-full blur-2xl group-hover:bg-[#1cdb55]/20 transition-all duration-500" />
              <h3 className="text-5xl md:text-6xl font-extrabold text-[#1cdb55] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#1cdb55] to-[#7be69d] drop-shadow-sm mb-2">1k+</h3>
              <p className="text-muted-foreground font-semibold tracking-wide uppercase text-sm">Interview Questions</p>
            </div>

            {/* Stat Row 3 */}
            <div className="group relative bg-background/50 backdrop-blur-md border border-white/5 shadow-2xl p-8 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-[#5bc2e7]/40 hover:shadow-[0_0_40px_rgba(91,194,231,0.15)] flex flex-col items-center justify-center text-center">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#5bc2e7]/10 rounded-full blur-2xl group-hover:bg-[#5bc2e7]/20 transition-all duration-500" />
              <h3 className="text-5xl md:text-6xl font-extrabold text-[#5bc2e7] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#5bc2e7] to-[#a6dcf0] drop-shadow-sm mb-2">95%</h3>
              <p className="text-muted-foreground font-semibold tracking-wide uppercase text-sm">Success Rate</p>
            </div>

            {/* Stat Row 4 */}
            <div className="group relative bg-background/50 backdrop-blur-md border border-white/5 shadow-2xl p-8 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-[#798bfd]/40 hover:shadow-[0_0_40px_rgba(121,139,253,0.15)] flex flex-col items-center justify-center text-center">
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-[#798bfd]/10 rounded-full blur-2xl group-hover:bg-[#798bfd]/20 transition-all duration-500" />
              <h3 className="text-5xl md:text-6xl font-extrabold text-[#798bfd] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#798bfd] to-[#b3beff] drop-shadow-sm mb-2">24/7</h3>
              <p className="text-muted-foreground font-semibold tracking-wide uppercase text-sm">AI Active Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 flex flex-col md:flex-row items-center justify-center gap-3">
              <span>How It</span> <AnimatedWords />
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium mt-4">
              Four simple intuitive steps to accelerate your career growth with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 group p-6 rounded-2xl hover:bg-muted/10 border border-transparent hover:border-[#1cdb55]/30 hover:shadow-[0_0_30px_rgba(28,219,85,0.15)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-[#1cdb55]/20 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl group-hover:text-[#1cdb55] transition-colors">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upskill Together Creative Section */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#798bfd]/10 via-transparent to-transparent opacity-50" />
          <div className="dot-pattern absolute inset-0 opacity-30" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-gradient-to-br from-background via-muted/30 to-background border border-white/10 rounded-[3rem] p-8 md:p-16 text-center max-w-6xl mx-auto shadow-2xl relative overflow-hidden group">
            
            {/* Massive Glowing Core */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="w-[30rem] h-[30rem] bg-gradient-to-r from-[#1cdb55]/20 to-[#cca235]/20 blur-[100px] rounded-full animate-pulse object-cover" />
            </div>

            <div className="relative z-20 space-y-8 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1cdb55]/30 bg-[#1cdb55]/10 text-[#1cdb55] font-semibold text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                <span>The Future is Now</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                Let's <span className="text-[#1cdb55] italic font-serif group-hover:drop-shadow-[0_0_20px_rgba(28,219,85,0.4)] transition-all duration-500">Upskill</span> Together
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
                Grab your next big package. Build creative projects, master interviews, and forge your unique career path using elite AI assistance.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-10">
                <div className="bg-background/80 backdrop-blur-sm border border-border/50 p-6 rounded-3xl hover:border-[#5bc2e7]/50 hover:-translate-y-1 transition-all duration-300">
                  <Target className="w-8 h-8 text-[#5bc2e7] mb-4 mx-auto" />
                  <h3 className="font-bold text-lg mb-2">Lock Targets</h3>
                  <p className="text-sm text-muted-foreground">Find the elite roles that fit you perfectly.</p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm border border-border/50 p-6 rounded-3xl hover:border-[#cca235]/50 hover:-translate-y-1 transition-all duration-300">
                  <Code2 className="w-8 h-8 text-[#cca235] mb-4 mx-auto" />
                  <h3 className="font-bold text-lg mb-2">Create & Code</h3>
                  <p className="text-sm text-muted-foreground">Go beyond prep, build actual creative apps.</p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm border border-border/50 p-6 rounded-3xl hover:border-[#798bfd]/50 hover:-translate-y-1 transition-all duration-300">
                  <Trophy className="w-8 h-8 text-[#798bfd] mb-4 mx-auto" />
                  <h3 className="font-bold text-lg mb-2">Grab Packages</h3>
                  <p className="text-sm text-muted-foreground">Negotiate and land massively high offers.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-[#cca235] italic font-serif">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-border/50 rounded-lg px-6 hover:border-[#cca235]/40 hover:shadow-[0_0_20px_rgba(204,162,53,0.15)] transition-all duration-300 bg-background"
                >
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-[#cca235] transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full relative overflow-hidden py-24 bg-background">
        {/* Animated Background Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-12 -left-10 w-[20rem] h-[20rem] bg-[#5bc2e7]/10 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute top-1/2 -right-10 w-[15rem] h-[15rem] bg-[#798bfd]/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-10 left-1/3 w-[25rem] h-[25rem] bg-[#cca235]/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="group flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto bg-muted/30 backdrop-blur-2xl border border-white/10 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_30px_rgba(0,0,0,0.1)] hover:border-[#ff9100]/50 hover:shadow-[0_0_60px_rgba(255,145,0,0.25)] hover:-translate-y-2 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground font-serif leading-tight transition-colors duration-500 group-hover:text-[#ff9100]">
              Ready to Accelerate Your{" "}
              <span className="text-[#1cdb55] group-hover:text-foreground transition-colors duration-500 italic">Career?</span>
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg font-medium">
              Join thousands of professionals who are advancing their careers
              with next-generation AI guidance.
            </p>
            <div className="pt-4">
              <Link href="/dashboard" passHref>
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-bold bg-[#798bfd] text-white hover:bg-[#ff9100] hover:text-black hover:shadow-[0_0_30px_rgba(255,145,0,0.5)] transition-all duration-300 rounded-full"
                >
                  Start Your Journey Today <ArrowRight className="ml-2 h-5 w-5 hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
