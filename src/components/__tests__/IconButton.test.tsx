import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import IconButton from "@/Components/IconButton";
import SearchIcon from "@/Assets/images/icons/search.svg?react";

describe("<IconButton />", () => {
  it("renders with a proper aria label", () => {
    render(
      <IconButton label="Open search bar">
        <SearchIcon />
      </IconButton>,
    );
    expect(screen.getByLabelText(/open search bar/i)).toBeInTheDocument();
  });

  it("renders a disabled button properly", () => {
    render(
      <IconButton label="" disabled>
        <SearchIcon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders with a default size properly", () => {
    render(
      <IconButton label="">
        <SearchIcon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("w-9", "h-9");
  });

  it("renders with a custom size properly", () => {
    render(
      <IconButton label="" size="7">
        <SearchIcon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("w-7", "h-7");
  });

  it("handles clicks properly", async () => {
    const fn = vi.fn();
    render(
      <IconButton label="" onClick={fn}>
        <SearchIcon />
      </IconButton>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
