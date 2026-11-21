// The shop: one page, a cart kept in memory, and the API behind it.
import { createServer } from "node:http";
import { subtotal } from "./src/price.mjs";

const cart = { items: [] };
const total = () => subtotal(cart.items);

const page = () => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Tiny shop</title></head>
<body>
  <h1>Tiny shop</h1>
  <form method="post" action="/add"><button>Add a mug</button></form>
  <p>Items: ${cart.items.length}</p>
  <p>Total: ${total()}</p>
</body></html>`;

const readBody = (req) => new Promise((done) => { let s = ""; req.on("data", (c) => (s += c)); req.on("end", () => done(new URLSearchParams(s))); });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://shop");
  if (req.method === "GET" && url.pathname === "/") {
    res.setHeader("content-type", "text/html; charset=utf-8");
    return res.end(page());
  }
  if (req.method === "POST" && url.pathname === "/add") {
    await readBody(req);
    cart.items.push("mug");
    res.writeHead(303, { location: "/" });
    return res.end();
  }
  if (req.method === "GET" && url.pathname === "/api/cart") {
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ items: cart.items, total: total() }));
  }
  if (req.method === "GET" && url.pathname === "/api/health") {
    res.setHeader("content-type", "application/json");
    return res.end('{"ok":true}');
  }
  res.statusCode = 404;
  res.end("not found");
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, "127.0.0.1", () => console.log(`tiny shop on http://127.0.0.1:${port}`));
