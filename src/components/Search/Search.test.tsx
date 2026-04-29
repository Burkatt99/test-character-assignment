import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Search from "./index";

const defaultProps = {
  value: "",
  isLoading: false,
  onSearch: vi.fn(),
  onChange: vi.fn(),
};

describe("Search", () => {
  it("should render input and button", () => {
    render(<Search {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(/enter any number/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("should disable button when value is empty", () => {
    render(<Search {...defaultProps} value="" />);

    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("should enable button when value is provided", () => {
    render(<Search {...defaultProps} value="1" />);

    expect(screen.getByRole("button", { name: /search/i })).not.toBeDisabled();
  });

  it("should disable input and button when isLoading is true", () => {
    render(<Search {...defaultProps} value="1" isLoading />);

    expect(screen.getByPlaceholderText(/enter any number/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("should call onChange when input value changes", () => {
    const onChange = vi.fn();

    render(<Search {...defaultProps} onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText(/enter any number/i), {
      target: { value: "1" },
    });

    expect(onChange).toHaveBeenCalledWith("1");
  });

  it("should call onSearch when search button is clicked", () => {
    const onSearch = vi.fn();

    render(<Search {...defaultProps} value="1" onSearch={onSearch} />);

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearch).toHaveBeenCalled();
  });

  it("should call onSearch when Enter key is pressed", () => {
    const onSearch = vi.fn();

    render(<Search {...defaultProps} value="1" onSearch={onSearch} />);

    fireEvent.keyDown(screen.getByPlaceholderText(/enter any number/i), {
      key: "Enter",
    });

    expect(onSearch).toHaveBeenCalled();
  });

  it("should not call onSearch when other key is pressed", () => {
    const onSearch = vi.fn();

    render(<Search {...defaultProps} value="1" onSearch={onSearch} />);

    fireEvent.keyDown(screen.getByPlaceholderText(/enter any number/i), {
      key: "A",
    });

    expect(onSearch).not.toHaveBeenCalled();
  });
});
