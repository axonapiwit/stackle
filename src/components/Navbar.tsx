import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Icons } from './Icons'
// import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import { ModeToggle } from './ModeToggle';

const Navbar = async () => {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className='bg-white dark:bg-background sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white dark:bg-background '>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <MobileNav />

              <div className='ml-4 flex lg:ml-0'>
                <Link className='flex gap-x-2' href='/'>
                  <Icons.logo className='h-10 w-10' />
                  <h3 className="font-bold text-black dark:text-white">Stackle</h3>
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                {/* <NavItems /> */}
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
              
                  {isSupabaseConnected ? null : (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  )}

                  <AuthButton />

                  {isSupabaseConnected ? (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  ) : null}

                  {isSupabaseConnected ? null : (
                    <div className='flex lg:ml-6'>
                      <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                      />
                    </div>
                  )}

                  <ModeToggle />

                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar