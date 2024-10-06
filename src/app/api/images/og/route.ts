import { createReadStream } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const imagePath = join(
      process.cwd(),
      'public',
      'assets',
      'images',
      'og-image.png'
    );
    const imageStream = createReadStream(imagePath);

    const headers = new Headers();
    headers.set('Content-Type', 'image/png');

    return new NextResponse(imageStream as any, {
      status: 200,
      statusText: 'OK',
      headers,
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
};
