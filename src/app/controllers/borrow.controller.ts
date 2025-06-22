import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

// === Borrow a Book ===
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book.copies < quantity) {
      return res.status(400).json({ success: false, message: "Not enough copies available" });
    }

    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }
    await book.save();

    const borrowRecord = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error borrowing book", error });
  }
};

// === Borrowed Books Summary ===
export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving summary", error });
  }
};
