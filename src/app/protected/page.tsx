'use client'

import AuthButton from "@/components/AuthButton";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


const ProtectedPage = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()


  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (!user) {
        return redirect("/login");
      }
    };
    fetchUser();
  }, [])


  useEffect(() => {
    fetch(' https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {
        isLoading ?
          <Skeleton className="w-[100vh] h-[100vh] rounded" />
          :
          <div className='grid grid-cols-fluid gap-6 p-4'>
            {Object.values(data ?? []).map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                rating={product.rating.rate}
                price={product.price}
              />
            ))}
          </div>
      }
    </div>


  );
}

export default ProtectedPage

