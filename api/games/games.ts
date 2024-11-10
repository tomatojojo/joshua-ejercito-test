// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();
const port = 5000;

// Mock data for each tab
const mockData: { [key: string]: { id: number; name: string; description: string; provider: string }[] } = {
  START: [],
  NEW: [
    { id: 1, name: 'New Game 1', description: 'New exciting game!', provider: 'Provider A' },
    { id: 2, name: 'New Game 2', description: 'Try your luck with new game!', provider: 'Provider B' },
    { id: 3, name: 'New Game 3', description: 'A fresh and fun game!', provider: 'Provider C' },
    { id: 4, name: 'New Game 4', description: 'Explore new challenges!', provider: 'Provider A' },
  ],
  SLOTS: [
    { id: 1, name: 'Slot Game 1', description: 'Spin the wheel and win!', provider: 'Provider B' },
    { id: 2, name: 'Slot Game 2', description: 'Slot machine game for big wins!', provider: 'Provider A' },
  ],
  LIVE: [
    { id: 1, name: 'Live Game 1', description: 'Live game with real dealers!', provider: 'Provider C' },
    { id: 2, name: 'Live Game 2', description: 'Play live with other players!', provider: 'Provider A' },
    { id: 3, name: 'Live Game 3', description: 'Live game for the ultimate experience!', provider: 'Provider B' },
  ],
  JACKPOT: [
    { id: 1, name: 'Jackpot Game 1', description: 'Try your luck at the jackpot!', provider: 'Provider B' },
    { id: 2, name: 'Jackpot Game 2', description: 'Win big with the jackpot!', provider: 'Provider A' },
    { id: 3, name: 'Jackpot Game 3', description: 'Your chance at hitting the jackpot!', provider: 'Provider C' },
  ],
};

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { category } = req.query;
    const categoryUpper = String(category).toUpperCase();
  
    const modifiedData = mockData[categoryUpper as keyof typeof mockData]?.map((game) => ({
      ...game,
      uniqueId: `${categoryUpper}-${game.id}`,
    }));
  
    if (categoryUpper === 'START') {
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
    } else if (modifiedData && modifiedData.length > 0) {
      res.json(modifiedData);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  }