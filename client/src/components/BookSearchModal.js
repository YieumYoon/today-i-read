import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  Modal, 
  Box, 
  TextField, 
  IconButton, 
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress
} from '@mui/material';
import { Search, ArrowBack, Check } from '@mui/icons-material';

// Replace these with your actual Naver API credentials
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

// BookSearchModal component
// Props:
// - onBookSelect: Function to call when a book is selected
const BookSearchModal = ({ onBookSelect }) => {
  // State variables
  const [open, setOpen] = useState(false);  // Controls whether the modal is open or closed
  const [searchQuery, setSearchQuery] = useState('');  // Stores the current search query
  const [showManualInput, setShowManualInput] = useState(false);  // Controls whether to show manual input form
  const [bookTitle, setBookTitle] = useState('');  // Stores manually input book title
  const [bookAuthor, setBookAuthor] = useState('');  // Stores manually input book author
  const [bookCover, setBookCover] = useState(null);  // Stores manually uploaded book cover
  const [searchResults, setSearchResults] = useState([]);  // Stores search results
  const [isLoading, setIsLoading] = useState(false);  // Controls loading state during search

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal and reset states
  const handleClose = () => {
    setOpen(false);
    setShowManualInput(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Function to handle book search
  const handleSearch = async () => {
    if (!searchQuery) return;

    setIsLoading(true);
    try {
      // Make API request to search for books
      const response = await axios.get('http://localhost:5001/api/search', {
        params: {
          query: searchQuery,
          display: 10,
          start: 1
        },
        headers: {
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
        }
      });

      // Update search results with the response data
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching books:', error);
      // You could add error handling here, e.g., showing an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Function to switch to manual input mode
  const handleManualInput = () => {
    setShowManualInput(true);
  };

  // Function to go back to search mode from manual input
  const handleBackToSearch = () => {
    setShowManualInput(false);
  };

  // Function to handle manual book cover upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBookCover(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Function to handle submission of manually input book data
  const handleSubmitManualInput = () => {
    onBookSelect({ title: bookTitle, author: bookAuthor, cover: bookCover });
    handleClose();
  };

  // Function to handle selection of a book from search results
  const handleSelectBook = (book) => {
    onBookSelect({
      title: book.title.replace(/<\/?b>/g, ''),  // Remove HTML tags from title
      author: book.author.replace(/<\/?b>/g, ''),  // Remove HTML tags from author
      cover: book.image
    });
    handleClose();
  };

  return (
    <>
      {/* Button to open the modal */}
      <IconButton onClick={handleOpen} color="primary">
        <Search />
      </IconButton>

      {/* Modal component */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: '80vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          {showManualInput ? (
            // Manual Input Form
            <>
              <IconButton onClick={handleBackToSearch} sx={{ position: 'absolute', top: 8, left: 8 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" component="h2" mb={2}>
                Manual Book Input
              </Typography>
              <TextField
                fullWidth
                label="Book Title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Book Author"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                margin="normal"
              />
              <input
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="book-cover-upload"
              />
              <label htmlFor="book-cover-upload">
                <Button variant="contained" component="span" fullWidth sx={{ mt: 2 }}>
                  Upload Book Cover
                </Button>
              </label>
              {bookCover && (
                <Box mt={2} display="flex" justifyContent="center">
                  <img src={bookCover} alt="Book Cover" style={{ maxWidth: '100%', maxHeight: 200 }} />
                </Box>
              )}
              <Button onClick={handleSubmitManualInput} variant="contained" fullWidth sx={{ mt: 2 }}>
                Submit
              </Button>
            </>
          ) : (
            // Search Form and Results
            <>
              <TextField
                fullWidth
                label="Search for a book"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                margin="normal"
              />
              <Button onClick={handleSearch} variant="contained" fullWidth sx={{ mt: 2 }}>
                Search
              </Button>
              {isLoading ? (
                // Show loading spinner while searching
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
              ) : searchResults.length > 0 ? (
                // Display search results
                <List>
                  {searchResults.map((book, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={book.title.replace(/<\/?b>/g, '')} 
                        secondary={`${book.author.replace(/<\/?b>/g, '')} | ${book.publisher}`} 
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="select" onClick={() => handleSelectBook(book)}>
                          <Check />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                // Show manual input button if no results
                <Button onClick={handleManualInput} variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Manual Input
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default BookSearchModal;