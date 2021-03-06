import { Router, request, response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
//DRY
const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);

  const user = await createUserService.execute({
    name: name,
    email: email,
    password: password
  });
  delete user.password;

  return response.status(200).json(user);

});


usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = container.resolve(UploadUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_filename: request.file.filename
    });

    delete user.password;
    return response.status(200).json(user);

  });




export default usersRouter;
