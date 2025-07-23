import express, { Request, Response } from 'express';
import { authRouter } from './features/Auth/routes/Auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", authRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Express funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});