// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super_secret_key',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload recebido:', payload); // 👈 DEBUG para ver o que vem
    
    // Ajustar conforme o que você coloca no token
    return { 
      id: payload.id || payload.sub,        // Use 'id' se for assim que gera o token
      email: payload.email,
      username: payload.username 
    };
  }
}