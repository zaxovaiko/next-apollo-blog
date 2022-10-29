import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { fireAuth } from '../../lib/firebase';

type FirebaseExchangeCustomTokenResponse = {
  idToken: string;
  expiresIn: string;
  isNewUser: boolean;
  kind: string;
  refreshToken: string;
};

// Exchange custom token for an ID and refresh token
// https://firebase.google.com/docs/reference/rest/auth#section-verify-custom-token
export default async function generateCustomToken(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.query.uid) {
    res.status(404).send('No token');
  }
  const token = await fireAuth.createCustomToken(req.query.uid as string);

  try {
    const { data } = await axios.post<FirebaseExchangeCustomTokenResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${
        process.env.FIREBASE_WEB_API_KEY as string
      }`,
      {
        token,
        returnSecureToken: true,
      },
    );

    if (data.idToken) {
      return res.status(200).send(`Bearer ${data.idToken}`);
    }
  } catch (e) {
    return res.status(500).send((e as Error).message);
  }

  return res.status(404).send('Data is empty');
}
