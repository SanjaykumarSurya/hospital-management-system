export interface Appointment {
  _id?: string;
  patientId: string;
  doctorId: string;
  date: string;
  status: string;
  notes : string
}