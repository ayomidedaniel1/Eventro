import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { user, logout };
}
