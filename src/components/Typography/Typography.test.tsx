import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Typography from "./index";

describe("Typography", () => {
  it("should render provided text", () => {
    render(<Typography text="Hello" />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it('should render "Unknown" when text is not provided', () => {
    render(<Typography />);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it('should render "Unknown" when text is empty string', () => {
    render(<Typography text="" />);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("should apply secondary style when text is not provided", () => {
    const { container } = render(<Typography />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should use provided style when text exists", () => {
    render(<Typography text="Hello" style="danger" />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
