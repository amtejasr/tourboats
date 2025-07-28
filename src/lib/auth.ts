

// This is a mock authentication service.
// In a real application, this would be replaced by a proper authentication provider
// like Firebase Authentication, and user data would be stored in a database.
// We are keeping it to define roles for now.

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  password?: string; // Password should only be here for the mock service
}

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'amtejasr@gmail.com',
    role: 'admin',
    password: 'TourBoats@67',
  },
  {
    id: '2',
    name: 'Valued Customer',
    email: 'customer@example.com',
    role: 'customer',
    password: 'password123',
  },
];
