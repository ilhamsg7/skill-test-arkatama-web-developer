const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"home":{"uri":"\/","methods":["GET","HEAD"]},"auth.login":{"uri":"auth\/login","methods":["GET","HEAD"]},"auth.attempt":{"uri":"auth\/login","methods":["POST"]},"auth.logout":{"uri":"auth\/logout","methods":["POST"]},"dashboard.index":{"uri":"dashboard","methods":["GET","HEAD"]},"dashboard.travel.fetch":{"uri":"dashboard\/travel\/fetch","methods":["GET","HEAD"]},"dashboard.travel.store":{"uri":"dashboard\/travel\/store","methods":["POST"]},"dashboard.travel.update":{"uri":"dashboard\/travel\/{id}","methods":["PUT"],"parameters":["id"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
