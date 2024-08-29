import React, { useState } from 'react';
import axios from 'axios';

function BookInfoForm({ onBookSelect }) {
  // State variables
  const [inputMode, setInputMode] = useState('manual');
  // 'manual' for manual input, 'search' for book search
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle manual form submission
  const handleManualSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onBookSelect({ title, author }); // Pass the entered book info to parent component
  };

  // Function to handle book search
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Make an API call to Google Books
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
      // Update search results state with the response data
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error('Error searching for books:', error);
    }
  };

  // Function to handle selection of a book from search results
  const handleBookSelect = (book) => {
    const bookInfo = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown'
    };
    onBookSelect(bookInfo); // Pass the selected book info to parent component
  };

  return (
    <div>
      {/* Buttons to switch between manual input and search modes */}
      <div>
        <button onClick={() => setInputMode('manual')}>Manual Input</button>
        <button onClick={() => setInputMode('search')}>Search Books</button>
      </div>

      {/* Conditional rendering based on input mode */}
      {inputMode === 'manual' ? (
        // Manual input form
        <form onSubmit={handleManualSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            required
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        // Book search form and results
        <div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a book"
              required
            />
            <button type="submit">Search</button>
          </form>
          {/* List of search results */}
          <ul>
            {searchResults.map((book) => (
              <li key={book.id} onClick={() => handleBookSelect(book)}>
                {book.volumeInfo.title} by {book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookInfoForm;