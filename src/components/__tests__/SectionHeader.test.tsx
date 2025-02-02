import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SectionHeader from "@/Components/SectionHeader";

describe("<SectionHeader />", () => {
  it("renders correctly without a route", () => {
    render(<SectionHeader title="Test" />);

    expect(screen.getByRole("heading", { name: "Test" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /see more/i }),
    ).not.toBeInTheDocument();
  });

  it("renders correctly with a route", () => {
    render(
      <MemoryRouter>
        <SectionHeader title="Test" route="/test" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Test" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see more/i })).toBeInTheDocument();
  });

  it("navigates to a proper page correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<SectionHeader title="Test" route="/test" />}
          />
          <Route path="/test" element={<div data-testid="test-page" />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.queryByTestId("test-page")).not.toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("link", { name: /see more/i }));
    });

    expect(screen.getByTestId("test-page")).toBeInTheDocument();
  });
});
