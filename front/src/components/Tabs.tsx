import React, { useState, useEffect } from 'react';
import './Tabs.css';

const Tabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('START');
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
    const [games, setGames] = useState<any[]>([]);
    const [originalGames, setOriginalGames] = useState<any[]>([]);
    const [favoritedGames, setFavoritedGames] = useState<Map<string, boolean>>(new Map());
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [providers, setProviders] = useState<Set<string>>(new Set());

    const handleTabClick = async (tabName: string) => {
        setSelectedTab(tabName);
        // Fetch the games based on the selected tab
        const fetchGames = new Promise<any[]>((resolve, reject) => {
            fetch(`https://test-server-ruby-zeta.vercel.app/api/games/${tabName}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Bad Network Response');
                    }

                    console.log('Response:', response);
                    return response.json();
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });

        try {
            const data = await fetchGames;
            setGames(data);
            setOriginalGames(data);
            const newProviders = new Set(data.map((game) => game.provider));
            setProviders(newProviders);
        } catch (error) {
            console.error('Error fetching games:', error);
            setGames([]);
            setOriginalGames([]);
        }
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        if (e.target.value.trim() === '') {
            // If the search query is empty, reset the games list
            const fetchGames = new Promise<any[]>((resolve, reject) => {
                fetch(`https://test-server-ruby-zeta.vercel.app/api/games/${selectedTab}`)
                    .then((response) => response.json())
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });

            try {
                const data = await fetchGames;
                setGames(originalGames);
            } catch (error) {
                console.error('Error fetching games:', error);
                setGames([]);
            }
        } else {
            // Filter the games based on search query
            const filteredGames = originalGames.filter((game) =>
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

    const handleFilterClick = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const closePopup = () => {
        setIsFilterVisible(false);
    };

    const filterByProvider = (provider: string) => {
        const filteredGames = originalGames.filter((game) => {
            const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesProvider = game.provider === provider;
            return matchesSearch && matchesProvider;
        });
        //console.log('Filtered games:', filteredGames);
        setGames(filteredGames);
        closePopup();
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
                    <button className="filter-btn" onClick={handleFilterClick}>Filter</button>
                </div>
            )}

            {/* Popup for filter options */}
            {isFilterVisible && (
                <div className="filter-popup">
                    <div className="popup-content">
                        <h2>Filter Options</h2>
                        <div className="provider-buttons">
                            {Array.from(providers).map((provider) => (
                                <button
                                    key={provider}
                                    className="provider-btn"
                                    onClick={() => {
                                        console.log('Provider selected:', provider);
                                        filterByProvider(provider);
                                    }}
                                >
                                    {provider}
                                </button>
                            ))}
                        </div>
                        <button onClick={closePopup}>Close</button>
                    </div>
                    <div className="popup-overlay" onClick={closePopup}></div>
                </div>
            )}

            {/* Displaying the games list */}
            <div className="games-list">
                {games.length > 0 ? (
                    games.map((game: any) => {
                        //console.log(game.uniqueId);
                        return (
                            <div key={game.uniqueId} className="game-item">
                                <h3>{game.name}</h3>
                                {/* <p>{game.description}</p> */}

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
