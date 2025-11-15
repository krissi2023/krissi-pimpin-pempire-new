import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import SlotMachineScene from './SlotMachineScene';

/**
 * React component wrapper for Phaser slot machine game
 */
function SlotMachineGame({ gameConfig }) {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

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

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

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
