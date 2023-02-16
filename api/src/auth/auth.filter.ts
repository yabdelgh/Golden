import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Catch(Error, HttpException)
export class AuthFilter implements ExceptionFilter {
    constructor(private readonly config: ConfigService) {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(302)
            .redirect(this.config.get('FRONT_HOST'));
    }
}
