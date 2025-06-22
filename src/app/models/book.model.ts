import { Schema, model, Document } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

// Define an interface extending IBook + Mongoose Document + instance method
export interface BookDocument extends IBook, Document {
  updateAvailability: () => Promise<void>;
}

// Schema definition
const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['SCIENCE', 'FANTASY', 'HISTORY', 'FICTION', 'NON-FICTION'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Properly typed instance method
bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

// Export the model with the correct interface
export const Book = model<BookDocument>('Book', bookSchema);
