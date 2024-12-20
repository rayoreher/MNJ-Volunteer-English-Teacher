// import { useEffect, ComponentType, useState } from "react";
// import { useRouter } from "next/router";
// import { supabase } from "@/lib/supabase-client";
// import { Session } from "@supabase/supabase-js";

// // Create a higher-order component that enforces authentication
// const withAuth = <P extends object>(
//   WrappedComponent: ComponentType<P>,
// ): ComponentType<P> => {
//   const ComponentWithAuth = (props: P) => {
//     const router = useRouter();

//     useEffect(() => {
//       const getSession = async () => {
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();
//         if (!session) {
//           router.replace(
//             `/login?redirect=${encodeURIComponent(router.asPath)}`,
//           );
//         }
//       };

//       getSession();
//     }, [router]);

//     return <WrappedComponent {...props} />;
//   };

//   return ComponentWithAuth;
// };

// export default withAuth;
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Session } from '@supabase/supabase-js';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
      const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
         if (!session) {
           router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`);
         }
        setSession(session);
      };

      getSession();
    }, [router]);

    if (!session) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
