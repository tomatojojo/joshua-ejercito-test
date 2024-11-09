// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// Mock data for each tab
const mockData: { [key: string]: { id: number; name: string;}[] } = {
  START: [
    { id: 1, name: 'Game 1'},
    { id: 2, name: 'Game 2'},
    { id: 3, name: 'Game 3'},
    { id: 4, name: 'Game 4'},
    { id: 5, name: 'Game 5'},
    { id: 6, name: 'Game 6'},
    { id: 7, name: 'Game 7'},
    { id: 8, name: 'Game 8'},
    { id: 9, name: 'Game 9'},
    { id: 10, name: 'Game 10'},
  ],
  NEW: [
    { id: 1, name: 'New Game 1'},
    { id: 2, name: 'New Game 2'},
  ],
  SLOTS: [
    { id: 1, name: 'Slot Game 1' },
    { id: 2, name: 'Slot Game 2'},
  ],
  LIVE: [
    { id: 1, name: 'Live Game 1'},
  ],
  JACKPOT: [
    { id: 1, name: 'Jackpot Game 1'},
    { id: 2, name: 'Jackpot Game 2'},
  ],
};

app.use(cors());
app.use(express.json());

// Endpoint to get games for each tab
app.get('/api/games/:category', (req: Request, res: Response) => {
  const category = req.params.category.toUpperCase();

  // check category is a valid key in mockData
  if (mockData[category as keyof typeof mockData]) {
    res.json(mockData[category as keyof typeof mockData]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});