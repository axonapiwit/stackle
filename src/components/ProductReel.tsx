/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import type SwiperType from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href } = props
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(' https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const [swiper, setSwiper] = useState<null | SwiperType>(
    null
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (data.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (data.length ?? 0) - 1,
      })
    })
  }, [swiper, data])

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inactiveStyles = 'hidden text-gray-400'

  return (
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title ? (
            <h1 className='text-2xl font-bold text-gray-900 dark:text-foreground sm:text-3xl'>
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className='mt-2 text-sm text-muted-foreground'>
              {subtitle}
            </p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
            Shop the collection{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            <div className='group relative w-full bg-zinc-600 aspect-square overflow-hidden rounded-xl'>
              <div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    swiper?.slideNext()
                  }}
                  className={cn(
                    activeStyles,
                    'right-3 transition',
                    {
                      [inactiveStyles]: slideConfig.isEnd,
                      'hover:bg-primary-300 text-primary-800 opacity-100':
                        !slideConfig.isEnd,
                    }
                  )}
                  aria-label='next image'>
                  <ChevronRight className='h-4 w-4 text-zinc-700' />{' '}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    swiper?.slidePrev()
                  }}
                  className={cn(activeStyles, 'left-3 transition', {
                    [inactiveStyles]: slideConfig.isBeginning,
                    'hover:bg-primary-300 text-primary-800 opacity-100':
                      !slideConfig.isBeginning,
                  })}
                  aria-label='previous image'>
                  <ChevronLeft className='h-4 w-4 text-zinc-700' />{' '}
                </button>
              </div>
              <Swiper
                autoplay
                onSwiper={(swiper) => setSwiper(swiper)}
                // slidesPerGroup={4}
                spaceBetween={50}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                className='h-full w-full'>
                {Object.values(data ?? []).map((product: any) => (
                  <SwiperSlide
                    key={product.id}
                    className='-z-10 relative h-full w-full'>
                    <img
                      className='-z-10 h-full w-full object-cover object-center'
                      src={product.image}
                      alt='Product image'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReel