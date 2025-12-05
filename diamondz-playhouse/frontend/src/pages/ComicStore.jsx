import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { ComicCoverPlaceholder } from '../components/ImagePlaceholder';
import './ComicStore.css';

function ComicStore() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState(null);
  const [storyLoadingId, setStoryLoadingId] = useState(null);
  const [storyError, setStoryError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/comics`);
      setComics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comics:', error);
      setLoading(false);
    }
  };

  const handleStoryToggle = async (comic) => {
    if (activeStory?.id === comic.id) {
      setActiveStory(null);
      setStoryError(null);
      return;
    }

    setStoryError(null);
    setStoryLoadingId(comic.id);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/comics/${comic.id}/story`);
      setActiveStory({ id: comic.id, content: response.data.content, title: response.data.title });
    } catch (error) {
      console.error('Error fetching comic story:', error);
      setActiveStory(null);
      setStoryError({ id: comic.id, message: 'Failed to load story. Please try again.' });
    } finally {
      setStoryLoadingId(null);
    }
  };

  const handlePurchase = async (comic) => {
    if (!isAuthenticated || !user) {
      alert('Please log in to purchase comics!');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-checkout-session`,
        {
          comicId: comic.id,
          comicTitle: comic.title,
          price: comic.price,
          userId: user.userId || user.id
        }
      );

      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to initiate purchase. Please try again.');
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="comic-store">
      <h1>📚 Comic Store</h1>
      <p className="store-subtitle">
        Purchase comics to unlock puzzles, wallpapers, and arcade games!
      </p>

      <div className="comics-grid">
        {comics.map(comic => (
          <div key={comic.id} className="comic-card card">
            <div className="comic-thumbnail">
              {comic.thumbnail ? (
                <img src={comic.thumbnail} alt={comic.title} />
              ) : (
                <ComicCoverPlaceholder title={comic.title} comicId={comic.id} />
              )}
            </div>
            <div className="comic-details">
              <h3>{comic.title}</h3>
              <p className="comic-description">{comic.description}</p>
              
              <div className="comic-includes">
                <span className="badge">📖 Comic</span>
                {comic.puzzleIncluded && <span className="badge">{comic.puzzlesCount || 3} 🧩 Puzzles</span>}
                {comic.wallpaperIncluded && <span className="badge">{comic.wallpapersCount || 5} 🖼️ Wallpapers</span>}
                <span className="badge arcade">🎰 ${(comic.arcadeCredits / 100).toFixed(2)} Credits</span>
                <span className="badge gold">⭐ {comic.goldPointsReward} Points</span>
                <span className="badge pb">💎 {comic.pbPoints} PB</span>
              </div>

              <div className="comic-footer">
                <div className="comic-footer-left">
                  <span className="price">${(comic.price / 100).toFixed(2)}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleStoryToggle(comic)}
                    disabled={storyLoadingId === comic.id}
                  >
                    {storyLoadingId === comic.id
                      ? 'Loading Story...'
                      : activeStory?.id === comic.id
                        ? 'Hide Story'
                        : 'Preview Story'}
                  </button>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePurchase(comic)}
                >
                  Purchase
                </button>
              </div>
            </div>

            {storyError?.id === comic.id && (
              <div className="story-preview story-error">
                <p>{storyError.message}</p>
              </div>
            )}

            {activeStory?.id === comic.id && (
              <div className="story-preview">
                <ReactMarkdown className="story-markdown">
                  {activeStory.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComicStore;
