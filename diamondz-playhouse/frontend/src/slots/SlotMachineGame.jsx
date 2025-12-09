import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import axios from 'axios';
import SlotMachineScene from './SlotMachineScene';

/**
 * React component wrapper for Phaser slot machine game
 */
function SlotMachineGame({ gameConfig, userBalance, onBalanceUpdate }) {
  const gameRef = useRef(null);
  const containerRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    const startSession = async () => {
        if (!gameConfig?.id) return;
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/arcade/games/${gameConfig.id}/session`,
                {},
                { withCredentials: true }
            );
            sessionIdRef.current = response.data.sessionId;
            console.log("Session started:", response.data.sessionId);
        } catch (e) {
            console.error("Failed to start session", e);
        }
    };
    startSession();
  }, [gameConfig]);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current,
      backgroundColor: '#1a1a2e',
      scene: [SlotMachineScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    gameRef.current = new Phaser.Game(config);
    
    // Pass initial data to the scene
    gameRef.current.scene.start('SlotMachineScene', { 
      balance: userBalance,
      config: gameConfig,
      onSpin: async () => {
          if (!sessionIdRef.current) {
              console.warn("No session ID, cannot spin on server");
              throw new Error("Session not ready");
          }
          const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/arcade/games/${gameConfig.id}/session/${sessionIdRef.current}/action`,
              { action: 'spin', args: [] },
              { withCredentials: true }
          );
          
          if (response.data.userBalance !== undefined && onBalanceUpdate) {
              onBalanceUpdate(response.data.userBalance);
          }
          
          return response.data.result;
      },
      onSetBet: async (amount) => {
          if (!sessionIdRef.current) return null;
          const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/arcade/games/${gameConfig.id}/session/${sessionIdRef.current}/action`,
              { action: 'setBet', args: [amount] },
              { withCredentials: true }
          );
          return response.data.result;
      }
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, [userBalance, gameConfig]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        maxWidth: '800px', 
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)'
      }}
    />
  );
}

export default SlotMachineGame;
