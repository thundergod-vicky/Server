import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BiometricAuthGuard extends AuthGuard('biometric-jwt') {}
