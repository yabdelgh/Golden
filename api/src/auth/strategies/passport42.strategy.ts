import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Passport42Strategy extends PassportStrategy(Strategy, '42') {
    constructor(private authService: AuthService,
                private configService: ConfigService) {
        super({
            clientID: configService.get<string>('FORTYTWO_APP_ID'),
            clientSecret: configService.get<string>('FORTYTWO_APP_SECRET'),
            callbackURL: configService.get<string>('FORTYTWO_CALLBACK_URL'),
            profileFields: { 'id': 'id', 'username': 'login'}
      });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
   // const user = await this.authService.validateUser(username, password);
      const user = null;
      console.log(profile);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
