import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import MainPage from "../MainPage";

vi.mock("../MainPage", () => ({ default: () => <div data-testid="main" /> }));

describe("<ErrorPage />", () => {
  it("renders all elements correctly", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/flickstore/i)).toBeInTheDocument();
    expect(screen.getByText(/the page was not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/sorry. the page you are looking for was not found./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to the homepage/i }),
    ).toBeInTheDocument();
  });

  it("navigates to the homepage when the button is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/error"]}>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /go to the homepage/i });
    const user = userEvent.setup();

    await act(async () => {
      await user.click(button);
    });

    expect(
      screen.queryByText(/the page was not found/i),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
});
