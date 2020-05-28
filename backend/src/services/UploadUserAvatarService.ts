
import User from '../models/User';
import { getRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatar_filename: string;
}
/**
 * Dependecy Inversion(SOLID)
 */
class UploadUserAvatarService {


  public async execute({ user_id, avatar_filename }: Request): Promise<User> {

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id }
    });

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

    await userRepository.save(user);

    return user;
  }
}
export default UploadUserAvatarService;
