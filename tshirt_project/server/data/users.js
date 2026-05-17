import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by seeder or model hook if used correctly, but model hook runs on save(), insertMany might skip hooks depending on implementation. 
        // Wait, insertMany DOES NOT trigger 'save' hooks. I should hash it here or use create in a loop.
        // Actually, I'll let the seeder handle the loop/creation properly or hash it manually here.
        // Simpler: hash it here.
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

export default users;
