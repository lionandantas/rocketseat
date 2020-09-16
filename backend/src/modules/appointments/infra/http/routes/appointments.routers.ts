import { Router, request, response } from 'express';

import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

//DRY
const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {


  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  // const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({ provider_id: provider_id, date: parseDate });

  return response.json(appointment);

});

/*appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
});
*/

export default appointmentsRouter;
