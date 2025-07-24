
// This is a mock authentication service.
// In a real application, this would be replaced by a proper authentication provider
// like Firebase Authentication, and user data would be stored in a database.

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not exist in a real User object returned to client
  role: 'admin' | 'customer';
}

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'amtejasr@gmail.com',
    password: 'TourBoat@67',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Valued Customer',
    email: 'customer@example.com',
    password: 'password',
    role: 'customer',
  },
];
