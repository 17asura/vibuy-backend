// Estratégia JWT (usada para validar tokens no frontend)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Diz ao Passport onde buscar o token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Se true, o token é válido só se não tiver expirado
      ignoreExpiration: false,

      // Chave secreta usada para assinar/verificar JWT
      secretOrKey: process.env.JWT_SECRET || 'super_secret_key',
    });
  }

  // Payload é o conteúdo que puseste no token (ex: id, username)
  async validate(payload: any) {
    // Este return vai estar disponível no "req.user"
    return { userId: payload.sub, username: payload.username };
  }
}
