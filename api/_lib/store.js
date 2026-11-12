
import { get, put } from "@vercel/blob";

const ACCESS = "private";

export async function readJson(pathname, fallback = []) {
  const blob = await get(pathname, {
    access: ACCESS
  });

  if (!blob || blob.statusCode !== 200 || !blob.stream) {
    return fallback;
  }

  const content = await new Response(blob.stream).text();
  return JSON.parse(content);
}

export async function writeJson(pathname, data) {
  await put(
    pathname,
    JSON.stringify(data),
    {
      access: ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json"
    }
  );

  return true;
}
