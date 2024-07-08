import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ItemList from "./ItemList";

jest.mock("../Icon", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Icon</div>),
}));

describe("ItemList Component", () => {
  test("renders header and footer if provided", () => {
    render(
      <ItemList
        isLoading={false}
        items={[]}
        header={<div>Header Content</div>}
        footer={<div>Footer Content</div>}
      />
    );

    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  test("renders loader when isLoading is true", () => {
    render(<ItemList isLoading={true} items={[]} />);

    expect(screen.getByText("Mocked Icon")).toBeInTheDocument();
  });

  test("renders empty state when items are empty and not loading", () => {
    render(
      <ItemList
        isLoading={false}
        items={[]}
        emptyState={<div>Empty State</div>}
      />
    );

    expect(screen.getByText("Empty State")).toBeInTheDocument();
  });

  test("renders items correctly when not loading and items are provided", () => {
    const items = ["Item 1", "Item 2"];
    render(
      <ItemList
        isLoading={false}
        items={items}
        renderItem={(item, idx) => <div key={idx}>{item}</div>}
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("applies correct direction class based on direction prop", () => {
    const items = ["Item 1", "Item 2"];

    const { rerender } = render(
      <ItemList
        isLoading={false}
        items={items}
        direction="row"
        renderItem={(item, idx) => <div key={idx}>{item}</div>}
      />
    );

    expect(screen.getByRole("list")).toHaveClass("flex-row");

    rerender(
      <ItemList
        isLoading={false}
        items={items}
        direction="column"
        renderItem={(item, idx) => <div key={idx}>{item}</div>}
      />
    );

    expect(screen.getByRole("list")).toHaveClass("flex-col");
  });
});
