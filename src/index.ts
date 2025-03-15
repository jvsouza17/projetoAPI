import express from 'express';
import http from 'http'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routers/routers';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log('Servidor rodando na porta ' + PORT);
})

const MONGO_URL = (process.env.MONGO_URL);

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));
mongoose.connection.once('open', ()=> console.log("Conexão feita com o banco de dados!"));

app.use('/', router());