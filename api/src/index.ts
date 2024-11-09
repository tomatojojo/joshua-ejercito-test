// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// Mock data for each tab
const mockData: { [key: string]: { id: number; name: string; description: string }[] } = {
  START: [],
  NEW: [
    { id: 1, name: 'New Game 1', description: 'New exciting game!' },
    { id: 2, name: 'New Game 2', description: 'Try your luck with new game!' },
    { id: 3, name: 'New Game 3', description: 'A fresh and fun game!' },
    { id: 4, name: 'New Game 4', description: 'Explore new challenges!' },
  ],
  SLOTS: [
    { id: 1, name: 'Slot Game 1', description: 'Spin the wheel and win!' },
    { id: 2, name: 'Slot Game 2', description: 'Slot machine game for big wins!' },
  ],
  LIVE: [
    { id: 1, name: 'Live Game 1', description: 'Live game with real dealers!' },
  ],
  JACKPOT: [
    { id: 1, name: 'Jackpot Game 1', description: 'Try your luck at the jackpot!' },
    { id: 2, name: 'Jackpot Game 2', description: 'Win big with the jackpot!' },
    { id: 3, name: 'Jackpot Game 3', description: 'Your chance at hitting the jackpot!' },
  ],
};


app.use(cors());
app.use(express.json());

// Endpoint to get games for each tab
app.get('/api/games/:category', (req: Request, res: Response) => {
  const category = req.params.category.toUpperCase();

  const modifiedData = mockData[category as keyof typeof mockData].map((game) => ({
    ...game,
    uniqueId: `${category}-${game.id}`, //unique id
  }));

  if (category === 'START') {
    const combinedGames = [
      ...mockData.NEW, 
      ...mockData.SLOTS, 
      ...mockData.LIVE, 
      ...mockData.JACKPOT,
    ].map((game) => ({
      ...game,
      uniqueId: `START-${game.id}-${game.name}`,
    }));
    res.json(combinedGames);
  } else if (modifiedData.length > 0) {
    res.json(modifiedData);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});