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

export async function GET(request, { params }) {
  const { id } = await params;
  const data = await getData();
  const num = data[id];

  if (num !== undefined) {
    return new Response(JSON.stringify({ number: num }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}