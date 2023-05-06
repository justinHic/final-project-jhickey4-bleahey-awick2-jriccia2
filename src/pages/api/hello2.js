export const runtime = "edge";

export default function handler() {
  return Response.json({ name: "john" });
}
