import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class Passport42Strategy extends PassportStrategy(Strategy, '42') {
    constructor(private userService: UserService,
                private configService: ConfigService) {
      super({
        clientID: configService.get<string>('FORTYTWO_APP_ID'),
        clientSecret: configService.get<string>('FORTYTWO_APP_SECRET'),
        callbackURL: configService.get<string>('FORTYTWO_CALLBACK_URL'),
        profileFields: { 'id': 'id', 'login': 'login', 'email': 'email'}
      });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const { id, login, email } = profile;
    const user = await this.userService.validateUser({id, login, email});
    if (!user)
      throw new UnauthorizedException();
    return user;
  }
}
