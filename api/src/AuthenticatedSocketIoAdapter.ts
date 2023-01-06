import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  private readonly config: ConfigService;
  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
    this.config = this.app.get(ConfigService);
  }

  createIOServer(port: number, options?: any) {
    options.allowRequest = async (request, allowFunction) => {
      try {
        const token = request?.headers?.cookie?.replace('access_token=', '');
        const user = await this.jwtService.verify(token, {
          secret: this.config.get('JWT_SECRET'),
        });
        if (user && user.authenticated)
          return allowFunction(null, true);
        return allowFunction('Unauthorized', false);
      } catch {
        return allowFunction('Unauthorized', false);
      }
    };
    return super.createIOServer(port, options);
  }
}
