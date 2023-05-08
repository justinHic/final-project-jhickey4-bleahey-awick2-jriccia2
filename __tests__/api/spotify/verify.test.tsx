import { createMocks } from "node-mocks-http";
import verifyHandler from "@/pages/api/spotify/verify";
import fetchMock from "jest-fetch-mock";

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("/api/spotify/verify", () => {
  test("returns success", async () => {
    const { req, res } = createMocks();
    verifyHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(isRedirectURL(res._getJSONData())).toBe(true);
  });
});

interface RedirectURL {
  url: string;
}

function isRedirectURL(json: any): json is RedirectURL {
  if (!("url" in json)) {
    return false
  };
  return true;
}