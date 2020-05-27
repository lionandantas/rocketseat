import { Router, request, response } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//DRY
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {

  try {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    // const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ provider_id: provider_id, date: parseDate });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
});


export default appointmentsRouter;
