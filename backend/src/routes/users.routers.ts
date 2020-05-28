import { Router, request, response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UploadUserAvatarService from '../services/UploadUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
//DRY
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {


  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

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

    const updateUserAvatar = new UploadUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_filename: request.file.filename
    });

    delete user.password;
    return response.status(200).json(user);

  });




export default usersRouter;
