import { NextRequest, NextResponse } from 'next/server';
import appConfig from './app-config';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const defaultLanguage = appConfig.defaultLanguage.id;

  if (req.nextUrl.locale === defaultLanguage) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || defaultLanguage;
    if (locale !== defaultLanguage) {
      return NextResponse.redirect(
        new URL(
          `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url
        )
      );
    }
  }
}
