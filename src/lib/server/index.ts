type Timer = ReturnType<typeof setTimeout>;

const uuids: Record<string, Timer> = {};

// Clean up after 1 minute
const REMOVE_TIME = 60_000;

function scheduleRemoveUuid(uuid: string) {
  return setTimeout(() => { delete uuids[uuid]; }, REMOVE_TIME);
}

function addUuid(uuid: string) {
  uuids[uuid] = scheduleRemoveUuid(uuid);
}

/** Returns whether the UUID is unique */
export function checkUuid(uuid: string): boolean {
  if (uuid in uuids) {
    // Reset timer
    clearTimeout(uuids[uuid]);
    uuids[uuid] = scheduleRemoveUuid(uuid);
    return false;
  } else {
    addUuid(uuid);
    return true;
  }
}
