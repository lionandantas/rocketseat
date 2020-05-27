import { Router } from 'express';
import appointmentsRouter from './appointments.routers';
import usersRouter from './users.routers';
import sessionRouter from  './session.routers';

const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)


export default routes;
