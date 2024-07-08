import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CollapsiblePanel from "./CollapsiblePanel";

describe("CollapsiblePanel Component", () => {
  test("renders title and children", () => {
    render(
      <CollapsiblePanel title="Test Title">
        <div>Test Content</div>
      </CollapsiblePanel>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("toggles collapse state when clicked", () => {
    render(
      <CollapsiblePanel title="Test Title">
        <div>Test Content</div>
      </CollapsiblePanel>
    );

    const titleElement = screen.getByText("Test Title");
    const iconElement = screen.getByText("▲");

    // Initially, the content should be visible
    expect(screen.getByText("Test Content")).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(titleElement);
    expect(screen.queryByText("Test Content")).toBeNull();
    expect(iconElement.textContent).toBe("▼");

    // Click to expand again
    fireEvent.click(titleElement);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(iconElement.textContent).toBe("▲");
  });

  test("collapses content by default if defaultCollapsed is true", () => {
    render(
      <CollapsiblePanel title="Test Title" defaultCollapsed={true}>
        <div>Test Content</div>
      </CollapsiblePanel>
    );

    // The content should not be visible initially
    expect(screen.queryByText("Test Content")).toBeNull();
  });
});
