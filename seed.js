const mongoose = require("mongoose");
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;
const Book = require("./Models/bookModel");

mongoose.connect(mongoString);

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    genres: ["Fiction", "Classic"],
    description:
      "A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
    rating: 8.5,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    genres: ["Fiction", "Classic"],
    description:
      "A novel about the serious issues of rape and racial inequality narrated by a young girl named Scout Finch.",
    rating: 9.0,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    genres: ["Dystopian", "Political Fiction"],
    description:
      "A dystopian novel set in a totalitarian society ruled by Big Brother.",
    rating: 9.3,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    genres: ["Romance", "Classic"],
    description:
      "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    rating: 8.0,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 277,
    genres: ["Fiction", "Classic"],
    description:
      "A story about teenage angst and alienation narrated by Holden Caulfield.",
    rating: 7.5,
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    pages: 585,
    genres: ["Adventure", "Classic"],
    description:
      "A narrative of Captain Ahab’s obsessive quest to seek revenge on Moby Dick, a giant white sperm whale.",
    rating: 8.2,
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    pages: 1225,
    genres: ["Historical Fiction", "War"],
    description:
      "A historical novel that chronicles the French invasion of Russia and its impact on Tsarist society.",
    rating: 7,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    genres: ["Fantasy", "Adventure"],
    description:
      "A fantasy novel about Bilbo Baggins' adventure with a group of dwarves to reclaim their homeland from the dragon Smaug.",
    rating: 7,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    pages: 208,
    genres: ["Adventure Fiction", "Philosophical"],
    description:
      "A philosophical book that tells the story of Santiago, a shepherd boy who dreams of finding treasure in Egypt.",
    rating: 8.4,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    pages: 268,
    genres: ["Dystopian Fiction", "Science Fiction"],
    description:
      "A dystopian novel set in a technologically advanced future where people are controlled through conditioning.",
    rating: 8.7,
  },
];

const seedDatabase = async () => {
  try {
    // await Book.deleteMany({});

    await Book.insertMany(books);

    console.log("Books seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
