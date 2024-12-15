import { render, screen } from "@testing-library/react";
import Search from "@/Components/Search";

describe("<Search />", () => {
  it("renders correctly with initial focus", () => {
    render(<Search />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });
});
