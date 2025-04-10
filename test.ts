// Generate 100k UUIDs and test them all
import { v4 as uuidV4 } from 'uuid';

async function main() {
  for (let i = 0; i < 100_000; i++) {
    const uuid = uuidV4();
    const res = await fetch(`http://localhost:5173/api/${uuid}`);
    const { unique } = await res.json();
    console.log(i, unique ? 'unique' : 'used');
  }
}

void main();
