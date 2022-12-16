import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

jest.mock('../server/lib/firebase', () => ({
  __esModule: true,
  firebaseAuth: {
    deleteUser: (uid: string) => uid,
    verifyIdToken: () => true,
  },
}));
