
import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}



class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    
    const appointment = new Appointment({ provider: provider, date: date });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentInSameDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );
    return findAppointmentInSameDate || null;
  }
}

export default AppointmentsRepository;
