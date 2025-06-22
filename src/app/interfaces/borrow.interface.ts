import { Types } from 'mongoose';

export interface IBorrow {
  book: Types.ObjectId;  // Reference to Book
  quantity: number;
  dueDate: Date;
}
