import server from "../../dist/server/server.js";

export default async function handler(request: Request) {
  try {
    return await server.fetch(request, {}, {});
  } catch (error) {
    console.error("Netlify Serverless Function error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const config = {
  path: "/*"
};
