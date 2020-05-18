
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface Request {
  date: Date;
  provider: string;
}
/**
 * Dependecy Inversion(SOLID)
 */
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);
    //SoC Separation of Concerns (Separacao de preocupacoes)
    if (findAppointmentInSameDate) {
      throw Error('This appoinment is already booked');
    }

    const appointment = this.appointmentsRepository.create({ provider: provider, date: appointmentDate });

    return appointment;
  }
}
export default CreateAppointmentService;
