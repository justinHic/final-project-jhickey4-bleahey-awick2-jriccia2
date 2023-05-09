import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import Home from "@/pages/index";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@/resources/strings";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    localStorage.clear();
  });

  test("renders app title and description", async () => {
    expect(screen.getByText("CaDance")).toBeInTheDocument();
    expect(
      screen.getByText("A fine tuned running and listening experience")
    ).toBeInTheDocument();
  });

  test("does not navigate to loggedin page when tokens are not available", async () => {
    render(<Home />);
    await waitFor(() => expect(mockRouterPush).not.toHaveBeenCalled());
  });
});
