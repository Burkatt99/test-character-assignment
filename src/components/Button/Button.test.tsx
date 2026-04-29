import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./index";

describe("Button", () => {
  it("should render text when provided", () => {
    render(<Button text="Click me" onClick={vi.fn()} />);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should render close icon when close prop is true", () => {
    const { container } = render(<Button close onClick={vi.fn()} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should not render text when close prop is true", () => {
    render(<Button close text="Click me" onClick={vi.fn()} />);

    expect(screen.queryByText("Click me")).not.toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = vi.fn();

    render(<Button text="Click me" onClick={onClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button text="Click me" disabled onClick={vi.fn()} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should not call onClick when disabled", () => {
    const onClick = vi.fn();

    render(<Button text="Click me" disabled onClick={onClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("should apply className when provided", () => {
    const { container } = render(
      <Button text="Click me" className="custom-class" onClick={vi.fn()} />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
