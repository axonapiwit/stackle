'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {
  CheckCircle,
  Leaf,
  Package,
} from 'lucide-react'
import { Button, buttonVariants } from "@/components/ui/button";
import ProductReel from "@/components/ProductReel";
import { TypeAnimation } from "react-type-animation";

const perks = [
  {
    name: 'Instant Delivery',
    Icon: Package,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 7-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 10% of sales to the preservation and restoration of the natural environment.",
  },
]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight white:text-gray-900 dark:text-foreground sm:text-6xl'>
            Your marketplace for high-quality{' '}
            <TypeAnimation
              sequence={[
                'digital assets',
                1000,
                'fashion assets',
                1000,
                'home assets',
                1000,
                'beauty assets',
                1000,
              ]}
              speed={30}
              className='text-blue-600'
              repeat={Infinity}
            />
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to Stackle. Every asset on our
            platform is verified by our team to ensure our
            highest quality standards.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='/#'
              className={buttonVariants()}>
              New Products
            </Link>
            <Button variant='ghost'>
              Our quality promise &rarr;
            </Button>
          </div>
        </div>

        <ProductReel
          href='/#'
          title='Brand new'
        />
      </MaxWidthWrapper>

      <section className='border-t border-gray-200'>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900 dark:text-foreground'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
