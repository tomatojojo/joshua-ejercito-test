import React, { useState } from 'react';
import './Tabs.css';

const Tabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('');
    const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false); 
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false); 

    const handleTabClick = (tabName: string) => {
        if (tabName === 'SEARCH') {
            setIsSearchVisible(!isSearchVisible);
            setIsSearchSelected(!isSearchSelected);
        } else {
            setSelectedTab(tabName);
        }
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
        </div>
    );
};

export default Tabs;
