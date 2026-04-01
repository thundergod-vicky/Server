import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BiometricJwtStrategy extends PassportStrategy(
  Strategy,
  'biometric-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Specifically for non-expiring API tokens
      secretOrKey:
        process.env.BIOMETRIC_API_KEY_SECRET || 'biometric-secret-key-123',
    });
  }

  validate(payload: { sub: string }) {
    // For the biometric system, we expect a specific payload indicating it's the biometric system
    if (!payload || payload.sub !== 'biometric-system') {
      throw new UnauthorizedException('Invalid biometric integration token');
    }
    return { name: 'Biometric System', id: 'SYSTEM' };
  }
}
