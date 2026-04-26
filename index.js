export default {
  async fetch(request, env) {

    const url = new URL(request.url)

    // salvar
    if (url.pathname === "/api/save") {
      const body = await request.json()

      await env.RESULTS.put(
        body.token,
        JSON.stringify(body),
        { expirationTtl: 600 }
      )

      return new Response("OK")
    }

    // visualizar
    if (url.pathname.startsWith("/r/")) {
      const token = url.pathname.split("/r/")[1]

      const data = await env.RESULTS.get(token)

      if (!data) {
        return new Response("Não encontrado")
      }

      return new Response(data, {
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response("OK")
  }
}
