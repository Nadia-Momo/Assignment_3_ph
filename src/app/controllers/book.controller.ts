import { Request, Response } from "express";
import { Book } from "../models/book.model";

// === Create Book ===
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating book", error });
  }
};

// === Get All Books ===
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;

    const query: any = {};
    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving books", error });
  }
};

// === Get Book by ID ===
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving book", error });
  }
};

// === Update Book ===
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating book", error });
  }
};

// === Delete Book ===
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting book", error });
  }
};
