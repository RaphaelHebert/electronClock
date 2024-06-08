// Analogic.test.tsx
import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Analogic from "..";

describe("Analogic component", () => {
  test("renders clock numbers", () => {
    render(<Analogic />);

    // Check for specific clock numbers
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("renders clock hands", () => {
    render(<Analogic />);

    // Check for clock hands by their class names
    expect(document.querySelector(".needle")).toBeInTheDocument();
    expect(document.querySelector(".hands")).toBeInTheDocument();
    expect(document.querySelector(".hands.min")).toBeInTheDocument();
    expect(document.querySelector(".hands.day")).toBeInTheDocument();
  });

  test("clock center is rendered", () => {
    render(<Analogic />);

    // Check for clock center
    expect(document.querySelector(".center")).toBeInTheDocument();
  });
});
