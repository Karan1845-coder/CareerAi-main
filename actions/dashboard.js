"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAIInsights(industry) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  if (!industry || typeof industry !== "string") {
    throw new Error("A valid industry is required");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.3,
    },
  });

  const prompt = `
Analyze the ${industry} industry in India.

Return ONLY valid JSON with this structure:
{
  "salaryRanges": [
    {
      "role": "Software Engineer",
      "min": 300000,
      "max": 1500000,
      "median": 700000,
      "location": "Bengaluru"
    }
  ],
  "growthRate": 5,
  "demandLevel": "High",
  "topSkills": ["JavaScript", "SQL"],
  "marketOutlook": "Positive",
  "keyTrends": ["AI adoption"],
  "recommendedSkills": ["Cloud computing"]
}

Requirements:
- Include at least 5 distinct job roles in salaryRanges.
- Salary values must be annual salaries in INR, represented as numbers.
- min must be less than or equal to median.
- median must be less than or equal to max.
- Include at least 5 topSkills, keyTrends, and recommendedSkills.
- growthRate must be a number representing a percentage.
- demandLevel must be High, Medium, or Low.
- marketOutlook must be Positive, Neutral, or Negative.
- Use realistic, approximate Indian industry estimates.
- Do not include Markdown or explanations.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    const cleanedText = responseText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const insights = JSON.parse(cleanedText);

    validateInsights(insights);

    return insights;
  } catch (error) {
    console.error("[Industry Insights] Gemini generation failed:", error);

    throw new Error(
      `Could not generate industry insights: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

function validateInsights(insights) {
  if (!insights || typeof insights !== "object") {
    throw new Error("Insights must be a JSON object");
  }

  for (const field of [
    "salaryRanges",
    "topSkills",
    "keyTrends",
    "recommendedSkills",
  ]) {
    if (!Array.isArray(insights[field])) {
      throw new Error(`${field} must be an array`);
    }
  }

  if (insights.salaryRanges.length < 5) {
    throw new Error("At least 5 salary ranges are required");
  }

  for (const range of insights.salaryRanges) {
    if (
      !range ||
      typeof range.role !== "string" ||
      typeof range.location !== "string" ||
      typeof range.min !== "number" ||
      typeof range.max !== "number" ||
      typeof range.median !== "number" ||
      !Number.isFinite(range.min) ||
      !Number.isFinite(range.max) ||
      !Number.isFinite(range.median) ||
      range.min < 0 ||
      range.min > range.median ||
      range.median > range.max
    ) {
      throw new Error("A salary range contains invalid values");
    }
  }

  for (const field of [
    "topSkills",
    "keyTrends",
    "recommendedSkills",
  ]) {
    if (
      insights[field].length < 5 ||
      insights[field].some((item) => typeof item !== "string")
    ) {
      throw new Error(`${field} must contain at least 5 strings`);
    }
  }

  if (
    typeof insights.growthRate !== "number" ||
    !Number.isFinite(insights.growthRate) ||
    insights.growthRate < 0
  ) {
    throw new Error("growthRate must be a non-negative number");
  }

  if (!["High", "Medium", "Low"].includes(insights.demandLevel)) {
    throw new Error("Invalid demandLevel");
  }

  if (
    !["Positive", "Neutral", "Negative"].includes(
      insights.marketOutlook
    )
  ) {
    throw new Error("Invalid marketOutlook");
  }
}

export async function getIndustryInsights() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Please sign in");
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: { industryInsight: true },
    });

    if (!user) {
      throw new Error(
        "User record not found. Check your Clerk-to-database user sync."
      );
    }

    if (!user.industry) {
      throw new Error(
        "Your user profile has no industry selected. Complete onboarding first."
      );
    }

    const existing = user.industryInsight;

    const hasCompleteInsights =
      existing &&
      Array.isArray(existing.salaryRanges) &&
      existing.salaryRanges.length >= 5 &&
      Array.isArray(existing.topSkills) &&
      existing.topSkills.length >= 5 &&
      Array.isArray(existing.keyTrends) &&
      existing.keyTrends.length >= 5 &&
      Array.isArray(existing.recommendedSkills) &&
      existing.recommendedSkills.length >= 5 &&
      typeof existing.growthRate === "number" &&
      existing.growthRate > 0 &&
      ["High", "Medium", "Low"].includes(existing.demandLevel) &&
      ["Positive", "Neutral", "Negative"].includes(
        existing.marketOutlook
      );

    if (hasCompleteInsights) {
      return existing;
    }

    const insights = await generateAIInsights(user.industry);

    const data = {
      industry: user.industry,
      salaryRanges: insights.salaryRanges,
      growthRate: insights.growthRate,
      demandLevel: insights.demandLevel,
      topSkills: insights.topSkills,
      marketOutlook: insights.marketOutlook,
      keyTrends: insights.keyTrends,
      recommendedSkills: insights.recommendedSkills,
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    if (existing) {
      return await db.industryInsight.update({
        where: { id: existing.id },
        data: {
          ...data,
          lastUpdated: new Date(),
        },
      });
    }

    return await db.industryInsight.create({
      data,
    });
  } catch (error) {
    console.error("[Industry Insights] Failed:", error);
    throw error;
  }
}