jest.mock('../lib/firebase', () => ({
  __esModule: true,
  firebaseAuth: {
    deleteUser: (uid: string) => uid,
    verifyIdToken: () => true,
  },
}));

export {};
