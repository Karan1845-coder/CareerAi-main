"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Server, Globe, Database, BrainCircuit, ExternalLink, GraduationCap, Layout, Cpu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ROADMAPS = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master problem-solving patterns and algorithms for technical interviews.",
    videoId: "0bHoB32fuj0", // Striver DSA
    link: "https://youtu.be/0bHoB32fuj0?si=oayGFT7t9Ll7n2sz",
    provider: "Striver's A2Z Sheet",
    icon: <Code2 className="w-6 h-6 text-[#cca235]" />,
    colorClass: "border-[#cca235]/20 hover:border-[#cca235]/60 hover:shadow-[0_0_30px_rgba(204,162,53,0.15)]",
    bgClass: "bg-[#cca235]/10",
    textClass: "text-[#cca235]",
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Learn to architect scalable, resilient, and highly available systems.",
    videoId: "vvhC64hQZMk", 
    link: "https://youtu.be/vvhC64hQZMk?si=iaQprj1cdMx93F91",
    provider: "Gaurav Sen",
    icon: <Server className="w-6 h-6 text-[#5bc2e7]" />,
    colorClass: "border-[#5bc2e7]/20 hover:border-[#5bc2e7]/60 hover:shadow-[0_0_30px_rgba(91,194,231,0.15)]",
    bgClass: "bg-[#5bc2e7]/10",
    textClass: "text-[#5bc2e7]",
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Master React, modern UI/UX, state management, and performance.",
    videoId: "bMknfKXIFA8", // React course example
    link: "https://www.youtube.com/@javascriptmastery",
    provider: "JS Mastery",
    icon: <Layout className="w-6 h-6 text-[#798bfd]" />,
    colorClass: "border-[#798bfd]/20 hover:border-[#798bfd]/60 hover:shadow-[0_0_30px_rgba(121,139,253,0.15)]",
    bgClass: "bg-[#798bfd]/10",
    textClass: "text-[#798bfd]",
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Deep dive into APIs, databases, caching, and network protocols.",
    videoId: "V3ZPPPKEipA", 
    link: "https://youtu.be/V3ZPPPKEipA?si=anu7M15hp17lrsw5",
    provider: "Hussein Nasser",
    icon: <Database className="w-6 h-6 text-[#1cdb55]" />,
    colorClass: "border-[#1cdb55]/20 hover:border-[#1cdb55]/60 hover:shadow-[0_0_30px_rgba(28,219,85,0.15)]",
    bgClass: "bg-[#1cdb55]/10",
    textClass: "text-[#1cdb55]",
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Learn Docker, Kubernetes, CI/CD, AWS, and infrastructure optimization.",
    videoId: "hQcFE0RD0cQ", // TechWorld with Nana
    link: "https://www.youtube.com/@TechWorldwithNana",
    provider: "TechWorld with Nana",
    icon: <Cpu className="w-6 h-6 text-[#5bc2e7]" />,
    colorClass: "border-[#5bc2e7]/20 hover:border-[#5bc2e7]/60 hover:shadow-[0_0_30px_rgba(91,194,231,0.15)]",
    bgClass: "bg-[#5bc2e7]/10",
    textClass: "text-[#5bc2e7]",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Understand neural networks, modern LLMs, and data science basics.",
    videoId: "VMj-3S1tku0", // Andrej Karpathy
    link: "https://www.youtube.com/@AndrejKarpathy",
    provider: "Andrej Karpathy",
    icon: <BrainCircuit className="w-6 h-6 text-[#798bfd]" />,
    colorClass: "border-[#798bfd]/20 hover:border-[#798bfd]/60 hover:shadow-[0_0_30px_rgba(121,139,253,0.15)]",
    bgClass: "bg-[#798bfd]/10",
    textClass: "text-[#798bfd]",
  },
];

export default function InterviewRoadmaps() {
  return (
    <Card className="bg-background border border-border/40 shadow-xl rounded-3xl overflow-hidden mt-8">
      <CardHeader className="bg-muted/10 pb-6 border-b border-border/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <CardTitle className="text-3xl md:text-4xl font-bold font-serif text-foreground">
              Software Engineering <span className="text-[#cca235] italic">Roadmaps</span>
            </CardTitle>
            <CardDescription className="text-base mt-2 max-w-2xl">
              Watch curated tutorial crash-courses or read through the best practice roadmaps exactly where you are.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-8 p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {ROADMAPS.map((roadmap) => (
            <div 
              key={roadmap.id} 
              className={`flex flex-col bg-background border ${roadmap.colorClass} transition-all duration-500 rounded-3xl overflow-hidden relative group shadow-sm`}
            >
              {/* YouTube Embedded Video Box / Cover */}
              <div className="w-full aspect-video bg-muted relative overflow-hidden border-b border-border/40">
                {roadmap.videoId ? (
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${roadmap.videoId}?rel=0`} 
                    title={roadmap.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center ${roadmap.bgClass} bg-opacity-30`}>
                    <Code2 className={`w-16 h-16 ${roadmap.textClass} mb-4 opacity-80`} />
                    <span className="font-semibold text-lg">Interactive Document</span>
                  </div>
                )}
              </div>

              {/* Animated backdrop strictly for content body */}
              <div className={`absolute bottom-0 right-0 w-32 h-32 ${roadmap.bgClass} rounded-tl-full -z-10 group-hover:scale-110 transition-transform duration-500 opacity-50`} />
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-lg ${roadmap.bgClass}`}>
                    {roadmap.icon}
                  </div>
                  <h3 className="font-extrabold text-xl leading-tight group-hover:text-foreground transition-colors">{roadmap.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 flex-1 font-medium leading-relaxed">
                  {roadmap.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-border/40">
                  <Link href={roadmap.link} target="_blank" rel="noopener noreferrer" className="block outline-none">
                    <Button variant="ghost" className={`w-full justify-between hover:${roadmap.bgClass} hover:${roadmap.textClass} font-semibold transition-colors rounded-xl h-12 text-base`}>
                      Go to Channel / Resource
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
