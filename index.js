import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from './logger.js';
import userRouter from './routes/routes.js';
import { errorMiddleWare } from './modules/error-mw.js';
import rateLimit from 'express-rate-limit';


const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter); 
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());


app.use('/api/users', userRouter);

app.use(errorMiddleWare);

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    logger.info('Server started on port 3000');

})

export default app;