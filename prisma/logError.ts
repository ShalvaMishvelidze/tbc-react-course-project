import { prisma } from "@/lib/prisma";

export const logError = async (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : null;

  try {
    await prisma.log.create({
      data: {
        message,
        stack,
      },
    });
  } catch (err) {
    console.error("Failed to save error log:", err);
  }
};
