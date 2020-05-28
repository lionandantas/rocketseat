import { Router, request, response } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

//DRY
const sessionRouter = Router();


sessionRouter.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticateUser = new AuthenticationUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });

  delete user.password;
  return response.status(200).json({ user, token });

});




export default sessionRouter;
