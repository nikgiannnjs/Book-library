const express = require("express");
const Book = require("../Models/bookModel");
const router = express.Router(); //express drivers gia na mporw na routarw

router.post("/insertBookinDB", async (req, res) => {
  try {
    const data = new Book({
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      genres: req.body.genres,
      description: req.body.description,
      rating: req.body.rating,
    });

    const insertedBook = await data.save(); //kanei save ta data pou stelnw
    res.status(200).json(insertedBook);
    console.log("Book is saved in the Database");
  } catch {
    res.status(400).json({
      message: "Something went wrong while trying to insert a new book",
    });
  }
});

router.get("/allBooks", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
    console.log("All books in DB response was successful.");
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to send all books",
    });
  }
});

router.get("/bookById/:id", async (req, res) => {
  try {
    const requestedBook = await Book.findById(req.params.id);
    res.status(200).json(requestedBook);
    console.log("Requested book successfully sent.");
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to send a book by its id",
    });
  }
});

router.patch("/updateBookById/:id", async (req, res) => {
  try {
    id = req.params.id;
    updatedbody = req.body;
    const options = { new: true };

    updatedBook = await Book.findByIdAndUpdate(id, updatedbody, options);

    res.status(200).json(updatedBook);
    console.log("The book was updated successfully.");
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to update the book.",
    });
  }
});

router.delete("/deleteBookById/:id", async (req, res) => {
  try {
    id = req.params.id;
    const bookToDelete = await Book.findByIdAndDelete(id);
    res.send(`Book with ${id} id, was successfully deleted.`);
    console.log("The book was deleted successfully.");
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to delete the book.",
    });
  }
});

module.exports = router;
