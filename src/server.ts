import express from 'express';
import dotenv from 'dotenv'
import installApi from './Api/Api';

dotenv.config()

const app = express();

installApi(app)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});