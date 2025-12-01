import { calculateSessionDuration } from "@/utils/quizUtils";
import { test, expect } from "vitest";

test("calculateSessionDuration returns correct duration in seconds", () => {
  const startedAt = new Date("2024-01-01T10:00:00Z");
  const finishedAt = new Date("2024-01-01T10:30:00Z");
  const duration = calculateSessionDuration(startedAt, finishedAt);
  expect(duration).toBe(1800);
});
