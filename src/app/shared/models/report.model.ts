export interface Report {
  _id?: string;
  patientId: string;
  doctorName: string;
  description: string;
  fileUrl: string;
  date: Date;
}