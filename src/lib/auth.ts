

// This is a mock authentication service.
// In a real application, this would be replaced by a proper authentication provider
// like Firebase Authentication, and user data would be stored in a database.
// We are keeping it to define roles for now.

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export const users: User[] = [
  {
    id: '1', // This ID is now just for mock purposes
    name: 'Admin User',
    email: 'amtejasr@gmail.com',
    role: 'admin',
  },
  {
    id: '2', // This ID is now just for mock purposes
    name: 'Valued Customer',
    email: 'customer@example.com',
    role: 'customer',
  },
];
