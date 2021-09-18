import { Request, Response } from "express";
import express from 'express';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const app = express();

app.use(express.json());

app.use('/apip-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/terms', (req: Request, res: Response) => {
    res.send('Serviço funciando')
})

app.use('/v1',router);

export { app };