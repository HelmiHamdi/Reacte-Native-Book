import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const { title, caption, image, rating } = req.body;
    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;
    const newBook = new Book({
      title,
      caption,
      image: imageUrl,
      rating,
      user: req.user._id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//const response = await fetch("http://localhost:3003/api/books/?page=1&limit=5");
export const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");
    const total = await Book.countDocuments();
    res.send({
      books,
      currentPage: page,
      totalBooks: total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getBookByUser = async (req, res) => {
    try {
        const books = await Book.find({user:req.user._id}).sort({createdAt:-1});
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching user's books:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this book" });
    }
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Error deleting image from Cloudinary:", error);
      }
    }
    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting book:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

