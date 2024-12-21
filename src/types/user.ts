export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type UserDto = {
  id: string;
  userName: string;
  email: string;
  role: UserRoles;
  avatar: string | null;
  createdAt: string;
  updateAt: string;
};
