"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Linkedin,
  MapPin,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>

      {/* Market Overview & Growth Indicator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
        <Card className="relative overflow-hidden bg-background border-[#5bc2e7]/20 shadow-sm hover:border-[#5bc2e7]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(91,194,231,0.15)] transition-all duration-300 group rounded-3xl p-2">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#5bc2e7]/10 rounded-full blur-xl group-hover:bg-[#5bc2e7]/20 transition-all duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground tracking-wide uppercase">
              Market Outlook
            </CardTitle>
            <div className={`p-2 rounded-lg bg-background shadow-sm border border-border/50`}>
              <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight mt-2 mb-1">{insights.marketOutlook}</div>
            <p className="text-sm font-medium text-[#5bc2e7]">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-background border-[#1cdb55]/20 shadow-sm hover:border-[#1cdb55]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(28,219,85,0.15)] transition-all duration-300 group rounded-3xl p-2">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#1cdb55]/10 rounded-full blur-xl group-hover:bg-[#1cdb55]/20 transition-all duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground tracking-wide uppercase">
              Industry Growth
            </CardTitle>
            <div className={`p-2 rounded-lg bg-background shadow-sm border border-border/50`}>
              <TrendingUp className="h-5 w-5 text-[#1cdb55]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight mt-2 mb-4">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="h-2 bg-[#1cdb55]/20 [&>div]:bg-[#1cdb55]" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-background border-[#cca235]/20 shadow-sm hover:border-[#cca235]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(204,162,53,0.15)] transition-all duration-300 group rounded-3xl p-2">
          <div className="absolute -left-4 -top-4 w-24 h-24 bg-[#cca235]/10 rounded-full blur-xl group-hover:bg-[#cca235]/20 transition-all duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground tracking-wide uppercase">Demand Level</CardTitle>
            <div className={`p-2 rounded-lg bg-background shadow-sm border border-border/50`}>
              <BriefcaseIcon className="h-5 w-5 text-[#cca235]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#cca235] to-[#f5d576]">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 shadow-inner ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-background border-[#798bfd]/20 shadow-sm hover:border-[#798bfd]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(121,139,253,0.15)] transition-all duration-300 group rounded-3xl p-2">
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-[#798bfd]/10 rounded-full blur-xl group-hover:bg-[#798bfd]/20 transition-all duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground tracking-wide uppercase">Top Skills</CardTitle>
            <div className={`p-2 rounded-lg bg-background shadow-sm border border-border/50`}>
              <Brain className="h-5 w-5 text-[#798bfd]" />
            </div>
          </CardHeader>
          <CardContent className="mt-2">
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-[#798bfd]/10 text-foreground hover:bg-[#798bfd] hover:text-white transition-colors border border-[#798bfd]/30 text-xs py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm">
                              {item.name}: ₹{item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Deep Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Industry Trends Card (Cyan Vibe) */}
        <Card className="relative overflow-hidden bg-background border-[#5bc2e7]/20 hover:border-[#5bc2e7]/60 hover:shadow-[0_0_40px_rgba(91,194,231,0.15)] transition-all duration-500 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5bc2e7]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          <CardHeader className="pb-4 border-b border-border/40">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Sparkles className="h-6 w-6 text-[#5bc2e7]" />
              Key Industry Trends
            </CardTitle>
            <CardDescription>Current trends shaping the industry</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-5">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3 group/item">
                  <div className="mt-1.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-[#5bc2e7] group-hover/item:scale-150 group-hover/item:shadow-[0_0_10px_rgba(91,194,231,0.8)] transition-all" />
                  </div>
                  <span className="text-sm font-medium leading-relaxed group-hover/item:text-foreground transition-colors">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Skills Card (Purple Vibe) */}
        <Card className="relative overflow-hidden bg-background border-[#798bfd]/20 hover:border-[#798bfd]/60 hover:shadow-[0_0_40px_rgba(121,139,253,0.15)] transition-all duration-500 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#798bfd]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          <CardHeader className="pb-4 border-b border-border/40">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="h-6 w-6 text-[#798bfd]" />
              Recommended Skills
            </CardTitle>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2.5">
              {insights.recommendedSkills?.length > 0 ? (
                insights.recommendedSkills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium bg-[#798bfd]/10 text-foreground hover:bg-[#798bfd] hover:text-white hover:shadow-[0_0_15px_rgba(121,139,253,0.5)] transition-all duration-300 border border-[#798bfd]/20 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground w-full text-center py-4 italic">Analysis data pending</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Job Locations Card (Gold Vibe) */}
        <Card className="relative overflow-hidden bg-background border-[#cca235]/20 hover:border-[#cca235]/60 hover:shadow-[0_0_40px_rgba(204,162,53,0.15)] transition-all duration-500 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#cca235]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          <CardHeader className="pb-4 border-b border-border/40">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <MapPin className="h-6 w-6 text-[#cca235]" />
              Top Job Locations
            </CardTitle>
            <CardDescription>Where the demand is highest</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {insights.salaryRanges.map((range, index) => (
                <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#cca235]/10 transition-colors border border-transparent hover:border-[#cca235]/30">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      {range.location || "Major Cities, India"}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground mt-0.5 max-w-[150px] truncate" title={range.role}>
                      {range.role}
                    </span>
                  </div>
                  <Badge variant="outline" className="border-[#cca235]/50 text-foreground bg-background whitespace-nowrap">
                    Active Hiring
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Jobs Dropdown / Cards Section */}
      <div className="mt-12 space-y-8">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground font-extrabold">
            Explore <span className="text-[#cca235] italic">open roles.</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg md:text-xl">
            Based on your industry insights, here are direct links to explore real job listings in India on LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.salaryRanges.map((range, idx) => (
            <Card key={idx} className="relative overflow-hidden border border-border/50 bg-background hover:border-[#cca235]/50 hover:shadow-[0_0_30px_rgba(204,162,53,0.2)] hover:-translate-y-1 transition-all duration-500">
              <CardHeader className="bg-muted/20 border-b pb-5">
                <CardTitle className="text-xl md:text-2xl font-bold flex items-center justify-between">
                  <span className="truncate pr-2">{range.role}</span>
                  <div className="bg-blue-500/10 p-2 rounded-full">
                    <Linkedin className="h-6 w-6 text-blue-600" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col divide-y divide-border/50">
                  {/* Job Variant 1: All / General */}
                  <a
                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(range.role)}&location=India`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-5 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-semibold group-hover:text-[#cca235] transition-colors flex items-center gap-1">Latest Opportunities</span>
                      <span className="text-sm text-muted-foreground">General search across all levels</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 group-hover:bg-[#cca235] group-hover:text-black transition-colors">Apply</Badge>
                  </a>
                  
                  {/* Job Variant 2: Remote */}
                  <a
                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(range.role)}&location=India&f_WT=2`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-5 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-semibold group-hover:text-[#cca235] transition-colors flex items-center gap-1">Remote Positions</span>
                      <span className="text-sm text-muted-foreground">Work from anywhere</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 group-hover:bg-[#cca235] group-hover:text-black transition-colors">Apply</Badge>
                  </a>

                  {/* Job Variant 3: Entry Level */}
                  <a
                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(range.role)}&location=India&f_E=2`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-5 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-semibold group-hover:text-[#cca235] transition-colors flex items-center gap-1">Entry Level Roles</span>
                      <span className="text-sm text-muted-foreground">Great for fresh talent</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 group-hover:bg-[#cca235] group-hover:text-black transition-colors">Apply</Badge>
                  </a>

                  {/* Job Variant 4: Senior Level */}
                  <a
                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(range.role)}&location=India&f_E=4`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-5 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-semibold group-hover:text-[#cca235] transition-colors flex items-center gap-1">Senior Positions</span>
                      <span className="text-sm text-muted-foreground">For experienced professionals</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 group-hover:bg-[#cca235] group-hover:text-black transition-colors">Apply</Badge>
                  </a>

                  {/* Job Variant 5: Contract/Freelance */}
                  <a
                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(range.role)}&location=India&f_JT=C`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-5 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-semibold group-hover:text-[#cca235] transition-colors flex items-center gap-1">Contract / Freelance</span>
                      <span className="text-sm text-muted-foreground">Project-based and temporary</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 group-hover:bg-[#cca235] group-hover:text-black transition-colors">Apply</Badge>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
