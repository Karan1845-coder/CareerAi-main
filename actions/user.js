
"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

/**
 * Find the authenticated user's database record.
 * Create a record if it doesn't exist and the email is not already in use.
 */
async function getOrCreateUser(userId) {
  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  const clerkUser = await currentUser();

  if (!clerkUser || clerkUser.id !== userId) {
    throw new Error("Unable to retrieve authenticated Clerk user");
  }

  const email = clerkUser.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    throw new Error("Your Clerk account does not have an email address");
  }

  // Avoid violating the unique email constraint or linking accounts blindly.
  const existingEmailUser = await db.user.findUnique({
    where: { email },
  });

  if (existingEmailUser) {
    throw new Error(
      "This email already belongs to a database user. " +
      "Verify the existing Clerk ID before linking accounts."
    );
  }

  // Handle a possible concurrent request safely.
  try {
    return await db.user.create({
      data: {
        clerkUserId: userId,
        email,
      },
    });
  } catch (error) {
    // Another request may have created the record at the same time.
    if (error?.code === "P2002") {
      const userByClerkId = await db.user.findUnique({
        where: { clerkUserId: userId },
      });

      if (userByClerkId) {
        return userByClerkId;
      }
    }

    throw error;
  }
}

/**
 * Update the signed-in user's onboarding profile.
 */
export async function updateUser(data) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Please sign in");
  }

  if (!data || typeof data.industry !== "string" || !data.industry.trim()) {
    throw new Error("A valid industry is required");
  }

  try {
    const user = await getOrCreateUser(userId);

    const profileData = {
      industry: data.industry.trim(),
      experience: data.experience,
      bio: data.bio,
      skills: data.skills,
    };

    // Generate insights only when this industry has no record yet.
    const existingInsight = await db.industryInsight.findUnique({
      where: { industry: profileData.industry },
    });

    if (!existingInsight) {
      try {
        const insights = await generateAIInsights(profileData.industry);

        await db.industryInsight.upsert({
          where: { industry: profileData.industry },
          update: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
          create: {
            industry: profileData.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      } catch (error) {
        // Profile onboarding can still complete if Gemini is unavailable.
        console.error("Industry insights generation failed:", error);
      }
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: profileData,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/onboarding");

    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);

    throw new Error(
      error instanceof Error ? error.message : "Failed to update profile"
    );
  }
}

/**
 * Check whether the authenticated user has completed onboarding.
 */
export async function getUserOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Please sign in");
  }

  const user = await getOrCreateUser(userId);

  return {
    isOnboarded: Boolean(user.industry),
  };
}
