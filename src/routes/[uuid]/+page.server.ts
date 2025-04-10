import { checkUuid } from '$lib/server';
import validator from 'validator';

export async function load(req: import('./$types').RequestEvent) {
  const uuid = req.params.uuid;

  if (!validator.isUUID(uuid)) {
    return { unique: false, valid: false, uuid };
  }

  const unique = checkUuid(uuid);
  console.log(`${uuid} | ${unique ? 'unique' : 'used'}`)
  return { unique, valid: true, uuid };
}
