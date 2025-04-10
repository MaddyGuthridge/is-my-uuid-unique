import validator from 'validator';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Returns whether the UUID is unique */
export async function checkUuidLocalstorage(uuid: string): Promise<boolean> {
  let uuids: string[];
  try {
    uuids = JSON.parse(localStorage.getItem('uuids') ?? '[]');
  } catch {
    uuids = [];
  }
  if (!uuids.includes(uuid)) {
    // Store the new UUID in localstorage
    uuids.push(uuid);
    localStorage.setItem('uuids', JSON.stringify(uuids));
    return true;
  }
  // Wait a moment to simulate loading
  await sleep(Math.random() * 500);
  return false;
}

export async function checkUuidApi(uuid: string): Promise<boolean> {
  const res = await fetch(`/api/${uuid}`);

  const { unique } = await res.json();
  return unique;
}

export async function checkUuid(uuid: string) {
  if (!validator.isUUID(uuid)) {
    return { unique: false, valid: false, uuid };
  }

  // If it's not unique in localstorage, don't bother sending a request
  if (!await checkUuidLocalstorage(uuid)) {
    return { unique: false, valid: true, uuid };
  }

  // Finally, check using the API
  const unique = await checkUuidApi(uuid);
  return { unique, valid: true, uuid };
}
