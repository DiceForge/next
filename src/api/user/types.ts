export interface User {
  id: number;
  username: string | null;
  email: string;
  admin: boolean;
  avatar_fetchable_id: number | null;
  avatar_url: string | null;
  created_at: string;
}
