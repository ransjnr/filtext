// server.js
import express from 'express';
import multer from 'multer';
import Tesseract from 'tesseract.js';
import pdf from 'pdf-parse';
import cors from 'cors';

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle file uploads and extraction
app.post('/extract', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        let extractedText = '';

        // Check file type and extract text accordingly
        if (file.mimetype.startsWith('image/')) {
            // Image file - use Tesseract.js
            const { data: { text } } = await Tesseract.recognize(file.buffer, 'eng');
            extractedText = text;
        } else if (file.mimetype === 'application/pdf') {
            // PDF file - use pdf-parse
            const dataBuffer = file.buffer;
            const data = await pdf(dataBuffer);
            extractedText = data.text;
        } else {
            return res.status(400).send('Unsupported file type.');
        }

        res.json({ text: extractedText });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing file.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:5000`);
});