import { Session, User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuth: (session: Session | null) => void;
  logout: () => Promise<void>;
};

export type EventCardProps = {
  id: string;
  title: string;
  starts_at: string;
  location: string;
  image_url: string;
};
