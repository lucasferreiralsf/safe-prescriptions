import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/utils/generics/service.generic';
import { User } from './user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

@Injectable()
export class UserService extends GenericService<User, UserCreateDto, UserUpdateDto>{
  constructor( @InjectRepository(User) private readonly userModel: Repository<User>){
    super(userModel);
  }

  async storeUser(user: UserCreateDto): Promise<User> {
    const userCreated: any = await this.create(
      user,
    );
    if (userCreated.password || userCreated.emailToken) {
      userCreated.password = undefined;
      userCreated.emailToken = undefined;
    }
    return userCreated;
  }

  async updateUser(
    field: FindConditions<User>,
    user: UserUpdateDto,
  ) {
    const userUpdated: any = await this.update(
      field,
      user,
    );
    userUpdated.emailToken = undefined;
    userUpdated.password = undefined;
    return userUpdated;
  }

  async findBy(
    field: { email: string },
    withPassword: boolean = false,
  ) {
    return await this.userModel.findOne(
      field,
    );
  }

  async getAll(currentPage: string, perPage: string) {
    return await this.fetchAll(
      currentPage,
      perPage,
    );
  }
}
