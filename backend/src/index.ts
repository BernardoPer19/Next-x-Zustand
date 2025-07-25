import express from 'express';
import { errorHandler } from './Error/ErrorHandler';
import { prisma } from './config/prisma';
import { iniciarAuthRouter } from './features/Auth/routes/Auth.routes';
import { iniciarClientRouter } from './features/Clients/routes/Clients.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api/auth", iniciarAuthRouter({ prisma }));
app.use("/", iniciarClientRouter({ prisma }))



app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});