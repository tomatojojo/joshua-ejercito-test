// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// Mock data for each tab
const mockData: { [key: string]: { id: number; name: string;}[] } = {
  START: [],
  NEW: [
    { id: 1, name: 'New Game 1'},
    { id: 2, name: 'New Game 2'},
    { id: 3, name: 'New Game 3'},
    { id: 4, name: 'New Game 4'},
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
    { id: 3, name: 'Jackpot Game 3'},
  ],
};

app.use(cors());
app.use(express.json());

// Endpoint to get games for each tab
app.get('/api/games/:category', (req: Request, res: Response) => {
  const category = req.params.category.toUpperCase();

  if (category === 'START') {
    const combinedGames = [...mockData.NEW, ...mockData.SLOTS, ...mockData.LIVE, ...mockData.JACKPOT];
    res.json(combinedGames);
  } else if (mockData[category as keyof typeof mockData]) {
    res.json(mockData[category as keyof typeof mockData]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});