import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
// TODO: ts mad at toBeInTheDocument if comment out the import statement below
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const headingElement = screen.getByText("Docs");

    expect(headingElement).toBeInTheDocument();
  });
});
