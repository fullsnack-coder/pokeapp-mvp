import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";

jest.mock("@/modules/shared/components/Icon", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Icon</div>),
}));

describe("SearchResult Component", () => {
  const defaultProps = {
    name: "Pikachu",
    sprite: "pikachu.jpg",
    types: ["Electric"],
  };

  test("renders with correct name and types", () => {
    render(<SearchResult {...defaultProps} />);
    expect(screen.getByLabelText("Pikachu")).toBeInTheDocument();
    expect(screen.getByLabelText("Types: Electric")).toBeInTheDocument();
  });

  test("renders link with correct href", () => {
    render(<SearchResult {...defaultProps} />);
    const link = screen.getByRole("link", { name: /view details/i });
    expect(link).toHaveAttribute("href", "/pokemons/Pikachu");
  });

  test("renders sprite image with correct alt text", () => {
    render(<SearchResult {...defaultProps} />);
    const image = screen.getByAltText("Pikachu");
    expect(image).toHaveAttribute("src", "pikachu.jpg");
  });

  test("renders chevron-right icon inside link", () => {
    render(<SearchResult {...defaultProps} />);
    const icon = screen.getByText("Mocked Icon");
    expect(icon).toBeInTheDocument();
  });
});
