const worker = {
  async fetch(req, env) {
    const { pathname } = new URL(req.url);
    const url = new URL(pathname, env.APP_HOST);
    const res = await fetch(url);
    const headers = new Headers(res.headers);
    headers.delete("x-served-by");
    return new Response(res.body, {
      headers,
      status: res.status,
      statusText: res.statusText,
    });
  },
};

export { worker as default };
