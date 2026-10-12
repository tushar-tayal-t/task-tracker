import { NextResponse } from 'next/server';
import { APP_CONFIG } from '@/config/app.config';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      app: APP_CONFIG.name,
      version: APP_CONFIG.version,
      timestamp: new Date().toISOString(),
      uptime: process.uptime ? Math.floor(process.uptime()) : 0,
    },
    { status: 200 }
  );
}
