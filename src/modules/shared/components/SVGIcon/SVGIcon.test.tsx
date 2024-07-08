import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SVGIcon, { DEFAULT_ICON_SIZE } from "./SVGIcon";

const icons = {
  loader: [
    "M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z",
  ],
  magnify: [
    "M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  ],
  "chevron-right": [
    "M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z",
  ],
};

describe("SVGIcon Component", () => {
  test("renders correctly with default size", () => {
    const { container } = render(<SVGIcon svgPaths={icons.loader} />);
    const svgElement = container.querySelector("svg");

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", DEFAULT_ICON_SIZE.toString());
    expect(svgElement).toHaveAttribute("height", DEFAULT_ICON_SIZE.toString());
  });

  test("renders correctly with custom size", () => {
    const customSize = 48;
    const { container } = render(
      <SVGIcon svgPaths={icons.magnify} size={customSize} />
    );
    const svgElement = container.querySelector("svg");

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", customSize.toString());
    expect(svgElement).toHaveAttribute("height", customSize.toString());
  });

  test("renders all paths", () => {
    const { container } = render(<SVGIcon svgPaths={icons["chevron-right"]} />);
    const pathElements = container.querySelectorAll("path");

    expect(pathElements).toHaveLength(icons["chevron-right"].length);
    icons["chevron-right"].forEach((path, index) => {
      expect(pathElements[index]).toHaveAttribute("d", path);
    });
  });
});
