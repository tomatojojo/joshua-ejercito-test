import React, { useState, useEffect } from 'react';
import './Tabs.css';

const Tabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('');
    const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false); 
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [games, setGames] = useState<any[]>([]);

    const handleTabClick = async (tabName: string) => {
        if (tabName === 'SEARCH') {
          setIsSearchVisible(!isSearchVisible);
          setIsSearchSelected(!isSearchSelected);
        } else {
          setSelectedTab(tabName);
        //   const response = await fetch(`http://localhost:5000/api/games/${tabName}`);
        //   const data = await response.json();
        //   setGames(data);

            const fetchGames = new Promise<any[]>((resolve, reject) => {
                fetch(`http://localhost:5000/api/games/${tabName}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Bad Network Response');
                        }
                        return response.json();
                    })
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });

            try {
                const data = await fetchGames;
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
                setGames([]);
            }
        }
    };

    const chunkGames = (games: any[]) => {
        const chunks = [];
        let i = 0;
        for (i = 0; i < games.length; i += 3) {
            chunks.push(games.slice(i, i + 3));
        }
        return chunks;
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                <div 
                    className={`tab ${isSearchSelected ? 'selected' : ''}`} // Keep the search tab highlighted
                    onClick={() => handleTabClick('SEARCH')}
                >
                    SEARCH
                </div>

                <div 
                    className={`tab ${selectedTab === 'START' ? 'selected' : ''}`} 
                    onClick={() => handleTabClick('START')}
                >
                    START
                </div>

                <div 
                    className={`tab ${selectedTab === 'NEW' ? 'selected' : ''}`} 
                    onClick={() => handleTabClick('NEW')}
                >
                    NEW
                </div>

                <div 
                    className={`tab ${selectedTab === 'SLOTS' ? 'selected' : ''}`} 
                    onClick={() => handleTabClick('SLOTS')}
                >
                    SLOTS
                </div>

                <div 
                    className={`tab ${selectedTab === 'LIVE' ? 'selected' : ''}`} 
                    onClick={() => handleTabClick('LIVE')}
                >
                    LIVE
                </div>

                <div 
                    className={`tab ${selectedTab === 'JACKPOT' ? 'selected' : ''}`} 
                    onClick={() => handleTabClick('JACKPOT')}
                >
                    JACKPOT
                </div>
            </div>

            {isSearchVisible && (
                <div className="search-bar-container">
                    <input type="text" placeholder="Search..." className="search-bar" />
                    <button className="filter-btn">Filter</button>
                </div>
            )}

            {/* Displaying the games list */}
            <div className="games-list">
                {games.length > 0 ? (
                    games.map((game: any) => (
                        <div key={game.id} className="game-item">
                            <h3>{game.name}</h3>
                            <p>{game.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No games available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Tabs;
