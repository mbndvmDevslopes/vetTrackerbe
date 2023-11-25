import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
const app = express();
//routers
import dogRouter from './routes/dogRouter.js';
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use('/dogs', dogRouter);
//NOT FOUND ROUTE MIDDLEWARE
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'something went wrong' });
    next();
});
const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=server.js.map