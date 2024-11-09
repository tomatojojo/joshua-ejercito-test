import React, { useState, useEffect } from 'react';
import './Tabs.css';

const Tabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('START');
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
    const [games, setGames] = useState<any[]>([]);
    const [favoritedGames, setFavoritedGames] = useState<Map<string, boolean>>(new Map());

    const handleTabClick = async (tabName: string) => {
        setSelectedTab(tabName);
        // Fetch the games based on the selected tab
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
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        if (e.target.value.trim() === '') {
            // If the search query is empty, reset the games list
            const fetchGames = new Promise<any[]>((resolve, reject) => {
                fetch(`http://localhost:5000/api/games/${selectedTab}`)
                    .then((response) => response.json())
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
        } else {
            // Filter the games based on search query
            const filteredGames = games.filter((game) =>
                game.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setGames(filteredGames);
        }
    };

    const toggleFavorite = (uniqueId: string) => {
        setFavoritedGames((prev) => {
            const updatedFavorites = new Map(prev);
            const isFavorited = updatedFavorites.get(uniqueId) || false;
            updatedFavorites.set(uniqueId, !isFavorited); // Toggle the favorite status of the game
            return updatedFavorites;
        });
    };

    useEffect(() => {
        handleTabClick(selectedTab); // Fetch games when tab is first selected
    }, [selectedTab]);

    return (
        <div className="tabs-container">
            <div className="tabs">
                <div
                    className={`tab ${selectedTab === 'SEARCH' ? 'selected' : ''}`}
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
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
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="filter-btn">Filter</button>
                </div>
            )}

            {/* Displaying the games list */}
            <div className="games-list">
                {games.length > 0 ? (
                    games.map((game: any) => {
                        console.log(game.uniqueId);
                        return (
                            <div key={game.uniqueId} className="game-item">
                                <h3>{game.name}</h3>
                                <p>{game.description}</p>
                                {/* Star icon for favoriting */}
                                <span
                                    className={`star-icon ${favoritedGames.get(game.uniqueId) ? 'favorited' : ''}`}
                                    onClick={() => toggleFavorite(game.uniqueId)}
                                >
                                    ★
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p>No games available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Tabs;
