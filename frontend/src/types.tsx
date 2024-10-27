export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  onDelete?: (id: number) => void; // Optional, to be used in UserTable
  onEdit?: (user: User) => void; // Optional, to be used in UserTable
}
