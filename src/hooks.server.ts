import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const logger: Handle = async (req) => {
  const requestStartTime = Date.now();
  const response = await req.resolve(req.event);
  const responseString = [
    new Date(requestStartTime).toISOString(),
    req.event.request.method,
    `${req.event.url.pathname}:`,
    response.status,
    `(${Date.now() - requestStartTime} ms)`
  ].join(' ');
  console.log(responseString);
  return response;
}

export const handle = sequence(logger);
