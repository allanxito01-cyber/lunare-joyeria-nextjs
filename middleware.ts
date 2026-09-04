import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clonamos la URL de forma segura para Vercel
  const url = request.nextUrl.clone()

  // Verificamos si existe la cookie de autenticación de Supabase
  const hasSession = request.cookies.getAll().some(
    cookie => cookie.name.includes('sb-') || cookie.name.includes('supabase')
  )
  
  // Si intenta entrar al dashboard y no tiene sesión, lo redirigimos
  if (url.pathname.startsWith('/dashboard') && !hasSession) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}