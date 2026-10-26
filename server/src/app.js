import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import ticketsRoutes from './routes/tickets.routes.js';
import agentsRoutes from './routes/agents.routes.js';
import searchRoutes from './routes/search.routes.js';
import revisionsRoutes from './routes/revisions.routes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' }, error: null });
});

// revisions must be mounted BEFORE tickets so /:id/revisions matches first
app.use('/api/tickets/:id/revisions', revisionsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/search', searchRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, data: null, error: err.message });
});

export default app;