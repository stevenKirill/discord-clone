import express, { Request, Response } from 'express'
import prisma from './db';
import { INTERNAL_SERVER_ERROR } from './constants';
import cors from 'cors';

const app = express();
app.use(cors())
const port = process.env.PORT || 3004;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "alive" });
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

app.post('/user', async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, imageUrl, email } = req.body;
    const currentUser = await prisma.profile.findUnique({
      where: {
        userId: id,
      }
    });
    if (currentUser) {
      return res.status(200).json(currentUser);
    }
    const newProfile = await prisma.profile.create({
      data: {
        userId: id,
        name: `${firstName} ${lastName}`,
        imageUrl,
        email,
      }
    });
    return res.status(200).json(newProfile);
  } catch (error) {
    return res.status(500).json({
      reason: INTERNAL_SERVER_ERROR,
    });
  }
});
