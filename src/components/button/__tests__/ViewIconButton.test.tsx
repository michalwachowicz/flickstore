import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ViewIconButton from "@/Components/button/ViewIconButton";

describe("<ViewIconButton />", () => {
  it("renders a proper list view button", () => {
    render(<ViewIconButton isList />);

    expect(
      screen.getByRole("button", { name: /switch to grid view/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("list-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("grid-icon")).not.toBeInTheDocument();
  });

  it("renders a proper grid view button", () => {
    render(<ViewIconButton />);

    expect(
      screen.getByRole("button", { name: /switch to list view/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("grid-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("list-icon")).not.toBeInTheDocument();
  });

  it("runs the on click function when button is clicked", async () => {
    const fn = vi.fn();
    render(<ViewIconButton onClick={fn} />);

    expect(fn).toHaveBeenCalledTimes(0);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
