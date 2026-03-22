import iam from './auth';
import user from './user'
import post from './post'
import { Router, Request, Response } from "express";

const routes = Router();

// Health check endpoint
routes.get('/healthy', (_req: Request, res: Response) => {
    res.json({ success: true, data: "healthy" });
});

// API routes
routes.use(iam);
routes.use(user);
routes.use(post);

export default routes;
