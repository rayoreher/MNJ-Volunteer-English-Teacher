import { supabase } from '@/lib/supabase-client'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: { session } } = await supabase.auth.getSession()
    console.log(session);
    
  if (!session) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen">
      <div className="flex-1 p-8">
        {children}
      </div>
    </main>
  )
}