export interface User {
  id: string | number;
  name: string;
  email: string;
  password: string;
  organisationId: number;
  createdAt: string;
  updatedAt: string;
  token: string;
  organisation: {
    id: string | number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}
