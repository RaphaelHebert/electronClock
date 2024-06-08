// Digital.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Digital from "..";

describe("Digital component", () => {
  it("renders the digital clock with correct initial time", () => {
    // Mock the Date to control the current time
    const mockDate = new Date("2023-01-01T12:34:56");
    vi.setSystemTime(mockDate);

    render(<Digital />);

    // Extract hours, minutes, and seconds from the mockDate
    const hours = String(mockDate.getHours()).padStart(2, "0");
    const minutes = String(mockDate.getMinutes()).padStart(2, "0");
    const seconds = String(mockDate.getSeconds()).padStart(2, "0");
    const expectedTime = `${hours}:${minutes}:${seconds}`;

    const clockElement = screen.getByText(expectedTime);
    expect(clockElement).toBeInTheDocument();
  });

  it("updates the time every second", () => {
    // Mock the Date to control the current time
    const mockDate = new Date("2023-01-01T12:34:56");
    vi.setSystemTime(mockDate);

    render(<Digital />);

    // Advance time by 1 second
    vi.advanceTimersByTime(1000);

    // Extract hours, minutes, and seconds from the updated mockDate
    mockDate.setSeconds(mockDate.getSeconds());
    const hours = String(mockDate.getHours()).padStart(2, "0");
    const minutes = String(mockDate.getMinutes()).padStart(2, "0");
    const seconds = String(mockDate.getSeconds()).padStart(2, "0");
    const updatedTime = `${hours}:${minutes}:${seconds}`;

    const updatedClockElement = screen.getByText(updatedTime);
    expect(updatedClockElement).toBeInTheDocument();
  });
});
