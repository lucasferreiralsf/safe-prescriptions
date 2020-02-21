import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async userExists(email: string) {
    const user = await this.userService.findBy({ email });
    if (user) {
      return true;
    }

    return false;
  }

  async register(user: UserCreateDto): Promise<User> {
    if(await this.userExists(user.email)) {
      return await this.userService.storeUser(user);
    }

    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.EMAIL_NOT_VALIDATED },
      HttpStatus.BAD_REQUEST,
    );
  }
}
