import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const mimeTypesDict: Record<string, string> = {
  js: "text/javascript",
  css: "text/css",
  svg: "image/svg+xml",
  html: "text/html",
};

const handler = async (req: Request) => {
  const { pathname } = new URL(req.url);

  if (/\.(css|js|svg)$/.test(pathname)) {
    const exec = /(?<file>[a-zA-Z]+\.\w+\.(?<ext>[a-z]+))$/.exec(pathname);

    if (!exec || !exec.groups) return new Response(null, { status: 404 });

    const {
      groups: { file, ext },
    } = exec;
    const content = await Deno.readFile(`./dist/assets/${file}`);

    return new Response(content, {
      headers: { "content-type": mimeTypesDict[ext] },
    });
  }

  const indexHTML = await Deno.readFile("./dist/index.html");
  return new Response(indexHTML, {
    headers: { "content-type": mimeTypesDict.html },
  });
};

serve(handler);

console.log("App running on https://localhost:8000");
