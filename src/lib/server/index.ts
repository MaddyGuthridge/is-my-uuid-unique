
const MAX_CACHE_SIZE = 100_000;

const uuids: string[] = [];

function addUuid(uuid: string) {
  // If we have too many UUIDs, trim the oldest one out
  if (uuids.length >= MAX_CACHE_SIZE) {
    uuids.splice(0, 1);
  }
  uuids.push(uuid);
}

/** Returns whether the UUID is unique */
export function checkUuid(uuid: string): boolean {
  if (uuids.includes(uuid)) {
    // Add it again so it gets invalidated less quickly
    addUuid(uuid);
    return false;
  } else {
    addUuid(uuid);
    return true;
  }
}
