import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyBonus.css';

function DailyBonus() {
  const [bonusData, setBonusData] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    fetchBonusStatus();
  }, []);

  const fetchBonusStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/rewards/daily-bonus?userId=user_123`
      );
      setBonusData(response.data);
    } catch (error) {
      console.error('Error fetching bonus:', error);
    }
  };

  const claimBonus = async () => {
    setClaiming(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/rewards/claim-daily-bonus`,
        { userId: 'user_123' }
      );
      
      setClaimed(true);
      alert(`🎉 ${response.data.message}\nYou received: ${response.data.bonus.goldPoints} Gold Points, ${response.data.bonus.pbPoints} PB!`);
      
      // Refresh bonus status
      setTimeout(() => {
        fetchBonusStatus();
        setClaimed(false);
      }, 2000);
    } catch (error) {
      console.error('Error claiming bonus:', error);
      alert('Failed to claim bonus. Try again!');
    }
    setClaiming(false);
  };

  if (!bonusData) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="daily-bonus-page">
      <h1>🎁 Daily Bonus</h1>
      
      <div className="streak-counter card">
        <h2>Current Streak</h2>
        <div className="streak-number">{bonusData.streak} Days</div>
        <p>Login daily to increase your rewards!</p>
      </div>

      <div className="bonus-calendar">
        {Object.entries(bonusData.allBonuses).map(([day, bonus], index) => {
          const dayNum = index + 1;
          const isToday = dayNum === bonusData.currentDay;
          const isPast = dayNum < bonusData.currentDay;
          
          return (
            <div 
              key={day} 
              className={`bonus-day card ${isToday ? 'today' : ''} ${isPast ? 'claimed' : ''}`}
            >
              <div className="day-label">Day {dayNum}</div>
              <div className="bonus-icon">
                {bonus.special ? '🎊' : '🎁'}
              </div>
              <div className="bonus-rewards">
                <div className="reward">⭐ {bonus.goldPoints}</div>
                <div className="reward">💎 {bonus.pbPoints}</div>
                {bonus.arcadeCredits && (
                  <div className="reward special">🎰 ${bonus.arcadeCredits / 100}</div>
                )}
              </div>
              {isPast && <div className="checkmark">✅</div>}
              {isToday && bonusData.canClaim && (
                <button 
                  className="btn btn-primary claim-btn"
                  onClick={claimBonus}
                  disabled={claiming || claimed}
                >
                  {claiming ? 'Claiming...' : claimed ? 'Claimed!' : 'Claim'}
                </button>
              )}
              {isToday && !bonusData.canClaim && (
                <div className="already-claimed">Claimed Today</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bonus-info card">
        <h3>How It Works</h3>
        <ul>
          <li>✅ Login daily to claim your bonus</li>
          <li>🔥 Build your streak for bigger rewards</li>
          <li>🎉 Day 7 gives special arcade credits!</li>
          <li>⚠️ Missing a day resets your streak</li>
        </ul>
      </div>
    </div>
  );
}

export default DailyBonus;
