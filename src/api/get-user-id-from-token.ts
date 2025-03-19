import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: string; // Declare os dados que espera no token
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token); // Decodifica o token
    return decoded.userId; // Retorna o userId
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}
