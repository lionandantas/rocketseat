
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
/**
 * Dependecy Inversion(SOLID)
 */
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository) {

  }

  public async execute({ name, email, password }: IRequest): Promise<User> {


    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address alredy used');
    }

    const hashPassword = await hash(password, 8);
    const user = this.userRepository.create({
      name,
      email,
      password: hashPassword
    });

    return user;
  }
}
export default CreateUserService;
