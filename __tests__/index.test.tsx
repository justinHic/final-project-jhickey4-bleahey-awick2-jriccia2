import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import Home from "@/pages/index";

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

  test("does not navigate to loggedin page when tokens are not available", async () => {
    render(<Home />);
    await waitFor(() => expect(mockRouterPush).not.toHaveBeenCalled());
  });

  // test("renders app title and description", () => {
  //   expect(screen.getByText("CaDance")).toBeInTheDocument();
  //   expect(
  //     screen.getByText("A fine tuned running and listening experience")
  //   ).toBeInTheDocument();
  // });
});
