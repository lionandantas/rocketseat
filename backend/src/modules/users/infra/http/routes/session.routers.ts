import { Router, request, response } from 'express';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';
import { container } from 'tsyringe';
//DRY
const sessionRouter = Router();


sessionRouter.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticationUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });

  delete user.password;
  return response.status(200).json({ user, token });

});




export default sessionRouter;
