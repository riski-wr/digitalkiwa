'use client'
import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {TAuthCredentialsValidator, AuthCredentialsValidator} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'

const Page = () => {
    const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({})
    
    const {
        register,
        handleSubmit,
        formState: {errors}
        } = useForm<TAuthCredentialsValidator>({
            resolver: zodResolver(AuthCredentialsValidator)
        })

   

    const onSubmit = ({email, password}: TAuthCredentialsValidator) =>{
        // mutate({email,password})
    }

  return (
    <>
        <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col items-center space-y-2 text-center'>
                    <Icons.logo className='h-20 w-20' />
                    <h1 className='text-2xl font-semibold tracking-tight'>
                    Create an account
                    </h1>
                    <Link href="/sign-in" className={buttonVariants({variant: 'link'})}>
                        Already have an account?
                    </Link>
                </div>
                <div className='grid gap-6'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-2">
                                <Label htmlFor='email' className='mb-2'>Email</Label>
                                <Input {...register("email")} className={cn({"focus-visible:ring-red-500": errors.email})} placeholder='you@example.com'/>
                            </div>
                            <div className="grid gap-1 py-2">
                                <Label htmlFor='password' className='mb-2'>Password</Label>
                                <Input  {...register("password")} className={cn({"focus-visible:ring-red-500": errors.password})} placeholder='******'/>
                            </div>
                            <Button>Sign Up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Page