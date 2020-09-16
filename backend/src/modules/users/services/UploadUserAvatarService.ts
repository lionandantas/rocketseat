
import User from '../infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatar_filename: string;
}
/**
 * Dependecy Inversion(SOLID)
 */
@injectable()
class UploadUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository) {

  }
  public async execute({ user_id, avatar_filename }: IRequest): Promise<User> {


    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can chagen avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }


    user.avatar = avatar_filename;

    await this.userRepository.save(user);

    return user;
  }
}
export default UploadUserAvatarService;
