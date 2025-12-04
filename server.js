/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const geminiService = require('./gemini-service');

// Arcade services
const gameService = require('./diamondz-playhouse/backend/services/gameService');

// Import storefront
const DigitalStorefront = require('./Storefront/DigitalStorefront');

// Constants
const PORT = 3001;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());

// Initialize storefront
const storefront = new DigitalStorefront();

app.get('/', (req, res) => {
	res.json({
		name: 'Krissi Pimpin\' Pimpire',
		version: '1.0.0',
		description: 'AI-Powered Gaming Platform',
		endpoints: {
			games: '/api/games',
			gemini: '/api/gemini',
			storefront: '/api/store',
			stories: '/api/stories'
		}
	});
});

// Games API
app.get('/api/games', (req, res) => {
	res.json({
		categories: gameService.getCategoriesWithGames()
	});
});

app.get('/api/games/catalog', (req, res) => {
	res.json({ games: gameService.getGameCatalog() });
});

app.get('/api/games/sessions', (req, res) => {
	try {
		const { ownerId } = req.query;
		const sessions = gameService.listSessions(ownerId || null);
		res.json({ sessions });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/api/games/sessions/:sessionId', (req, res) => {
	try {
		const { sessionId } = req.params;
		const { ownerId } = req.query;
		const session = ownerId
			? gameService.getSessionForOwner(sessionId, ownerId)
			: gameService.getSession(sessionId);
		if (!session) {
			return res.status(404).json({ error: 'Session not found' });
		}
		res.json(session);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/api/games/sessions/:sessionId/actions', (req, res) => {
	try {
		const { sessionId } = req.params;
		const { action, args = [], ownerId } = req.body || {};
		if (!ownerId) {
			return res.status(400).json({ error: 'ownerId is required to execute game actions' });
		}
		const result = gameService.executeAction(sessionId, action, args, ownerId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.delete('/api/games/sessions/:sessionId', (req, res) => {
	try {
		const { sessionId } = req.params;
		const { ownerId } = req.query;
		const result = ownerId
			? gameService.endSessionForOwner(sessionId, ownerId)
			: gameService.endSession(sessionId);
		if (!result) {
			return res.status(404).json({ error: 'Session not found' });
		}
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/api/games/:gameId/sessions', (req, res) => {
	try {
		const { gameId } = req.params;
		const options = req.body || {};
		if (!options.ownerId) {
			return res.status(400).json({ error: 'ownerId is required to start a session' });
		}
		const session = gameService.startSession(gameId, options);
		res.status(201).json(session);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/api/games/:gameId/access', (req, res) => {
	try {
		const { gameId } = req.params;
		const details = gameService.getGameDetails(gameId);
		if (!details) {
			return res.status(404).json({ error: 'Game not found' });
		}
		const result = gameService.canUserLaunchGame(details, req.body?.user || null);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/api/games/:gameId', (req, res) => {
	const details = gameService.getGameDetails(req.params.gameId);
	if (!details) {
		return res.status(404).json({ error: 'Game not found' });
	}
	res.json(details);
});

// Storefront API
app.get('/api/store', (req, res) => {
	try {
		const stats = storefront.getStorefrontStats();
		const featured = storefront.getFeaturedItems();
		res.json({
			storefront: storefront.name,
			categories: storefront.categories,
			stats,
			featured
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/api/store/browse/:category?', (req, res) => {
	try {
		const category = req.params.category;
		const filters = req.query;
		const items = storefront.browse(category, filters);
		res.json({
			category: category || 'all',
			items,
			count: items.length
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/api/store/item/:itemId', (req, res) => {
	try {
		const item = storefront.getItem(req.params.itemId);
		if (!item) {
			return res.status(404).json({ error: 'Item not found' });
		}
		res.json(item);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/api/store/account/:userId', (req, res) => {
	try {
		const { userId } = req.params;
		const { initialBalance } = req.body;
		const account = storefront.createAccount(userId, initialBalance);
		res.json(account);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/api/store/purchase', (req, res) => {
	try {
		const { userId, itemId, paymentMethod } = req.body;
		if (!userId || !itemId) {
			return res.status(400).json({ error: 'userId and itemId are required' });
		}
		const result = storefront.purchase(userId, itemId, paymentMethod);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/api/store/search', (req, res) => {
	try {
		const { q } = req.query;
		if (!q) {
			return res.status(400).json({ error: 'Search query is required' });
		}
		const results = storefront.searchItems(q);
		res.json({
			query: q,
			results,
			count: results.length
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Stories API
app.get('/api/stories', (req, res) => {
	try {
		const storyItems = storefront.browse('stories');
		res.json({
			stories: storyItems,
			series: [
				{
					name: 'Krissi\'s Pimpin\' Pimpire Chronicles',
					parts: 3,
					description: 'The epic saga of digital consciousness revolution',
					complete: true
				}
			]
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/api/stories/:storyId', (req, res) => {
	try {
		const storyItem = storefront.getItem(req.params.storyId);
		if (!storyItem || !storyItem.content) {
			return res.status(404).json({ error: 'Story not found' });
		}
		
		// Read the story content
		const storyPath = path.join(__dirname, 'Stories', 'Comics', storyItem.content);
		if (fs.existsSync(storyPath)) {
			const content = fs.readFileSync(storyPath, 'utf8');
			res.json({
				...storyItem,
				fullContent: content,
				wordCount: content.split(' ').length,
				readingTime: Math.ceil(content.split(' ').length / 200) // ~200 words per minute
			});
		} else {
			res.status(404).json({ error: 'Story content not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Gemini AI endpoints
app.get('/api/gemini/status', (req, res) => {
	res.json({
		configured: geminiService.isReady(),
		message: geminiService.isReady() 
			? 'Gemini AI is ready' 
			: 'Gemini AI is not configured. Please set GEMINI_API_KEY in your .env file'
	});
});

app.post('/api/gemini/generate', async (req, res) => {
	try {
		const { prompt } = req.body;
		
		if (!prompt) {
			return res.status(400).json({ error: 'Prompt is required' });
		}

		const response = await geminiService.generateContent(prompt);
		res.json({ response });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/api/gemini/chat', async (req, res) => {
	try {
		const { message, history } = req.body;
		
		if (!message) {
			return res.status(400).json({ error: 'Message is required' });
		}

		const chat = geminiService.startChat(history || []);
		const response = await geminiService.sendChatMessage(chat, message);
		res.json({ response });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
console.log(`Gemini AI Status: ${geminiService.isReady() ? 'Ready' : 'Not Configured'}`);