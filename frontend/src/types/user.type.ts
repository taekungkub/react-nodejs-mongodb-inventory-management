export interface UserTy {
  email: string;
  username: string;
  _id: string;
  __v: number;
  role: RoleTy;
  createdAt: Date;
  updatedAt: Date;
}

export type RoleTy = "user" | "admin" | "root";
