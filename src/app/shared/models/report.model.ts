export interface Report {
  _id?: string;
  patientId: string;
  description: string;
  prescription: string;
  fileUrl: string;
  createdAt?: Date;
}