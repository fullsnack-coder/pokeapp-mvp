import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ActivableChip from "./ActivableChip";

describe("ActivableChip Component", () => {
  const defaultProps = {
    isActive: false,
    type: "Test Chip",
    noSelected: false,
  };

  test("renders with correct text", () => {
    render(<ActivableChip {...defaultProps} />);
    expect(screen.getByText("Test Chip")).toBeInTheDocument();
  });

  test("applies active styles when isActive is true", () => {
    render(<ActivableChip {...defaultProps} isActive={true} />);
    const button = screen.getByText("Test Chip");
    expect(button).toHaveClass("bg-black text-white");
  });

  test("applies inactive styles when isActive is false", () => {
    render(<ActivableChip {...defaultProps} isActive={false} />);
    const button = screen.getByText("Test Chip");
    expect(button).toHaveClass("bg-white text-black");
  });

  test("applies noSelected styles when noSelected is true", () => {
    render(<ActivableChip {...defaultProps} noSelected={true} />);
    const button = screen.getByText("Test Chip");
    expect(button).toHaveClass("opacity-45");
  });

  test("renders with additional button props", () => {
    render(
      <ActivableChip
        {...defaultProps}
        _buttonProps={{ "aria-label": "test-button" }}
      />
    );
    const button = screen.getByLabelText("test-button");
    expect(button).toBeInTheDocument();
  });

  test("do not re-render if isActive and noSelected props do not change", () => {
    const { rerender } = render(<ActivableChip {...defaultProps} />);
    const button = screen.getByText("Test Chip");

    rerender(<ActivableChip {...defaultProps} />);
    expect(button).toBe(screen.getByText("Test Chip"));
  });
});
