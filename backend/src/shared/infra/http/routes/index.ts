import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routers';
import usersRouter from '@modules/users/infra/http/routes/users.routers';
import sessionRouter from '@modules/users/infra/http/routes/session.routers';

const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)


export default routes;
