export interface Appointment {
  _id?: string;
  patientId: string;
  doctorId: string;
  date: string;
  reason: string;
  notes : string
}