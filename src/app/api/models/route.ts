import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const modelsFilePath = path.join(process.cwd(), 'src', 'data', 'models.json');
    const modelsData = fs.readFileSync(modelsFilePath, 'utf8');
    const parsedData = JSON.parse(modelsData);
    
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error reading models data:', error);
    return NextResponse.json(
      { error: 'Failed to load models data' },
      { status: 500 }
    );
  }
} 