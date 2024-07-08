import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InfinitePaginatedList from "./InfinitePaginatedList";

jest.mock("../Icon", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Icon</div>),
}));

class IntersectionObserverMock {
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}

  observe = jest.fn();
  disconnect = jest.fn();

  triggerIntersect = jest.fn();
}

global.IntersectionObserver = IntersectionObserverMock as any;

const mockLoadMore = jest.fn();

const defaultProps = {
  hasMore: true,
  loadMore: mockLoadMore,
  isLoadingContent: false,
  isLoadingMore: false,
  listProps: {
    items: ["Item 1", "Item 2"],
    renderItem: (item: string, idx?: number) => <div key={idx}>{item}</div>,
  },
};

describe("InfinitePaginatedList Component", () => {
  test("renders ItemList with provided listProps", () => {
    render(<InfinitePaginatedList {...defaultProps} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("renders loader in footer when isLoadingMore is true", () => {
    render(<InfinitePaginatedList {...defaultProps} isLoadingMore={true} />);
    expect(screen.getByText("Mocked Icon")).toBeInTheDocument();
  });

  test("do not call loadMore when hasMore is false", () => {
    render(<InfinitePaginatedList {...defaultProps} hasMore={false} />);
    const endOfContent = screen.getByTestId("end-of-content");
    fireEvent.scroll(endOfContent);
    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  test("updates hasMoreRef when hasMore prop changes", () => {
    const { rerender } = render(<InfinitePaginatedList {...defaultProps} />);
    rerender(<InfinitePaginatedList {...defaultProps} hasMore={false} />);
    const endOfContent = screen.getByTestId("end-of-content");
    fireEvent.scroll(endOfContent);
    expect(mockLoadMore).not.toHaveBeenCalled();
  });
});
