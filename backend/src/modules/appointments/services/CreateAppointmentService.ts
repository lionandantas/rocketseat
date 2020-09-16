
import Appointment from '../infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import { injectable, inject } from 'tsyringe';

interface IRequest {
  date: Date;
  provider_id: string;
}
/**
 * Dependecy Inversion(SOLID)
 */
@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository) {

  }

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);
    //SoC Separation of Concerns (Separacao de preocupacoes)
    if (findAppointmentInSameDate) {
      throw new AppError('This appoinment is already booked', 400);
    }

    const appointment = this.appointmentRepository.create({
      provider_id: provider_id,
      date: appointmentDate
    });

    return appointment;
  }
}
export default CreateAppointmentService;
