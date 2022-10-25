import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private configService: ConfigService) { }
    
    async callback(user: any, res: any) {
        const payload = { login: user.login, sub: user.id };
        const token = await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: this.configService.get<string>('JWT_SECRET')
        });
        res.send(token);
        res.end();
    }
}