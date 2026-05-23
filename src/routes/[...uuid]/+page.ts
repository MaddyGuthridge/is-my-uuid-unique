export function load(req: import('./$types').PageLoadEvent) {
  return { uuid: req.params.uuid };
}
