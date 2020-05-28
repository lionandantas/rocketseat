
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppError from '../errors/AppError';

interface Request {
  date: Date;
  provider_id: string;
}
/**
 * Dependecy Inversion(SOLID)
 */
class CreateAppointmentService {


  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
    //SoC Separation of Concerns (Separacao de preocupacoes)
    if (findAppointmentInSameDate) {
      throw new AppError('This appoinment is already booked', 400);
    }

    const appointment = appointmentsRepository.create({
      provider_id: provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
