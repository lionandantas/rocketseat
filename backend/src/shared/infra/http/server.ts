import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/container/index';
import routes from './routes';
import bodyParser from 'body-parser';
import "reflect-metadata";
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import cors from 'cors';




const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())


app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message });
  }
  console.error(err);
  return response.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log(`Server started on port 3333! *0*`);
})
