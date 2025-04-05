import cors from 'cors';

const corsOption = {
    origin: '*',
}

const corsMiddleware = cors(corsOption);

export default corsMiddleware;