import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const ArcadeGameLauncher = ({ game, onClose }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionName, setActionName] = useState('');
  const [argsInput, setArgsInput] = useState('');
  const [actionResult, setActionResult] = useState(null);
  const [pendingAction, setPendingAction] = useState(false);
  const [endingSession, setEndingSession] = useState(false);

  const gameId = game?.id;

  useEffect(() => {
    if (!gameId) {
      return;
    }

    let cancelled = false;

    const startSession = async () => {
      setLoading(true);
      setError('');
      setActionResult(null);
      try {
        const response = await axios.post(`${API_BASE}/arcade/games/${gameId}/session`, {});
        if (!cancelled) {
          setSession(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          const apiError = err?.response?.data;
          if (apiError?.reasons && Array.isArray(apiError.reasons)) {
            setError([apiError.error || 'Unable to start game session', ...apiError.reasons].join('\n'));
          } else {
            setError(apiError?.error || err.message || 'Unable to start game session');
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    startSession();

    return () => {
      cancelled = true;
    };
  }, [gameId]);

  const parseArgs = useMemo(
    () => () => {
      if (!argsInput || !argsInput.trim()) {
        return [];
      }
      const raw = argsInput.trim();
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (err) {
        return [raw];
      }
    },
    [argsInput]
  );

  const executeAction = async (event) => {
    event.preventDefault();
    if (!session) {
      return;
    }
    if (!actionName.trim()) {
      setError('Enter a method name to invoke on the game instance');
      return;
    }
    setPendingAction(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE}/arcade/games/${session.gameId}/session/${session.sessionId}/action`, {
        action: actionName.trim(),
        args: parseArgs()
      });
      setActionResult(response.data);
      setSession((current) => (current ? { ...current, state: response.data?.state || current.state } : current));
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Unable to execute action');
    } finally {
      setPendingAction(false);
    }
  };

  const endSession = async () => {
    if (!session || endingSession) {
      onClose?.();
      return;
    }
    setEndingSession(true);
    try {
      await axios.delete(`${API_BASE}/arcade/games/${session.gameId}/session/${session.sessionId}`);
    } catch (err) {
      // Silent failure, still close modal so the user is not stuck
    } finally {
      setEndingSession(false);
      onClose?.();
    }
  };

  const renderState = (label, data) => {
    if (typeof data === 'undefined' || data === null) {
      return null;
    }

    return (
      <div className="modal-section">
        <h3>{label}</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="arcade-modal-backdrop">
      <div className="arcade-modal card">
        <button type="button" className="modal-close" onClick={endSession} aria-label="Close game launcher">
          ×
        </button>

        <h2 className="modal-title">{game?.name || 'Arcade Game'}</h2>
        <p className="modal-subtitle">Interact with the live game session straight from the backend engine.</p>

        {loading ? (
          <div className="modal-loading">
            <div className="spinner" />
            <p>Starting {game?.name}...</p>
          </div>
        ) : null}

        {error ? (
          <div className="modal-error">
            {error}
          </div>
        ) : null}

        {session && !loading ? (
          <>
            <div className="modal-section">
              <h3>Session Details</h3>
              <div className="session-grid">
                <div>
                  <span className="label">Session ID</span>
                  <span className="value">{session.sessionId}</span>
                </div>
                <div>
                  <span className="label">Game Type</span>
                  <span className="value">{session.type}</span>
                </div>
                {session.metadata?.minPlayers ? (
                  <div>
                    <span className="label">Players</span>
                    <span className="value">
                      {session.metadata.minPlayers}
                      {session.metadata.maxPlayers ? ` – ${session.metadata.maxPlayers}` : ''}
                    </span>
                  </div>
                ) : null}
                {session.metadata?.minBet ? (
                  <div>
                    <span className="label">Bet Range</span>
                    <span className="value">
                      {session.metadata.minBet}
                      {session.metadata.maxBet ? ` → ${session.metadata.maxBet}` : ''}
                    </span>
                  </div>
                ) : null}
                {session.metadata?.description ? (
                  <div className="session-description">
                    <span className="label">About</span>
                    <span className="value">{session.metadata.description}</span>
                  </div>
                ) : null}
              </div>
            </div>

            {renderState('Initialization Result', session.initializeResult)}
            {renderState('Start Result', session.startResult)}
            {renderState('Current Game State', session.state)}

            <form className="modal-section" onSubmit={executeAction}>
              <h3>Run Game Method</h3>
              <label className="field">
                Method Name
                <input
                  type="text"
                  value={actionName}
                  onChange={(event) => setActionName(event.target.value)}
                  placeholder="e.g. dealFlop"
                />
              </label>

              <label className="field">
                Arguments (JSON or comma-free text)
                <textarea
                  value={argsInput}
                  onChange={(event) => setArgsInput(event.target.value)}
                  placeholder='[] or {"playerId":1}'
                  rows={3}
                />
              </label>

              <button type="submit" className="btn btn-arcade" disabled={pendingAction}>
                {pendingAction ? 'Running…' : 'Execute Action'}
              </button>
            </form>

            {renderState('Action Result', actionResult)}
          </>
        ) : null}

        <div className="modal-footer">
          <button type="button" className="btn" onClick={endSession} disabled={endingSession}>
            {endingSession ? 'Closing…' : 'Close Session'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArcadeGameLauncher;
