export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string, // This will store the HASHED password
    public readonly createdAt: Date,
  ) {}

  // Domain Logic: We can add safeguards here
  // Example: Check if the user is valid before we even try to do anything else
  static validate(email: string, password: string): void {
    if (!email.includes('@')) throw new Error('Invalid email format');
    if (password.length < 6)
      throw new Error('Password must be at least 6 characters');
  }
}
