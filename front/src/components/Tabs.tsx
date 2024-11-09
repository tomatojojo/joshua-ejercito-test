import React, { useState } from 'react';
import './Tabs.css';

const Tabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('');

    const handleTabClick = (tabName: string) => {
        if (selectedTab === tabName) {
            setSelectedTab('');
        } else {
            setSelectedTab(tabName);
        }
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                <div className="tab" onClick={() => handleTabClick('SEARCH')}>
                    SEARCH
                </div>

                <div className="tab" onClick={() => handleTabClick('START')}>
                    START
                </div>

                <div className="tab" onClick={() => handleTabClick('NEW')}>
                    NEW
                </div>

                <div className="tab" onClick={() => handleTabClick('SLOTS')}>
                    SLOTS
                </div>

                <div className="tab" onClick={() => handleTabClick('LIVE')}>
                    LIVE
                </div>

                <div className="tab" onClick={() => handleTabClick('JACKPOT')}>
                    JACKPOT
                </div>
            </div>

            {selectedTab === 'SEARCH' && (
                <div className="search-bar-container">
                    <input type="text" placeholder="Search..." className="search-bar" />
                    <button className="filter-btn">Filter</button>
                </div>
            )}
        </div>
    );
};

export default Tabs;