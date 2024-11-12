import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { api } from './services/api';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Verifica se o token existe antes de continuar
  if (!token) {
    console.log("Token ausente. Redirecionando para login...");
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const response = await api.get('/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      console.log("Token válido");
      return NextResponse.next();
    }

  } catch (error) {
    console.log("Erro ao validar token:", error);
  }

  // Redireciona para a página inicial se o token for inválido
  console.log("Token inválido ou erro na validação. Redirecionando...");
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
