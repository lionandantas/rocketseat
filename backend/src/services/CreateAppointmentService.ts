
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

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
      throw Error('This appoinment is already booked');
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
