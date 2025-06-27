export interface Doctor {
  _id?: string;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  availabledays :string |[string];
  timeslot: string
}