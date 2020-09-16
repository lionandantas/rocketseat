
import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository } from 'typeorm';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';


class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id: provider_id,
      date: date
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment || undefined;
  }
}

export default AppointmentsRepository;
