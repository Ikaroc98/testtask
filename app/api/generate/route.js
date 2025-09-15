import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

async function getData() {
  try {
    const file = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

async function saveData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data));
}

export async function POST(request) {
  const num = Math.floor(Math.random() * 1000) + 1;
  const id = uuidv4();

  const data = await getData();
  data[id] = num;
  await saveData(data);

  return new Response(JSON.stringify({ id, number: num }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}