import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.get('/', (request, response) =>
  response.json({
    message: "Hello World! I am Whouse's API. Nice to meet you!!",
  }),
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
