'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { DevTool } from '@hookform/devtools'

const userDetailsSchema = z.object({
    name: z.string().min(3, { message: 'Must be 3 or more characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.number(),
})

type FormValues = {
    name: string
    email: string
    phone: string[]
    socials: {
        twitter: string
        linkedin: string
    }
    skills: {
        skill: string
    }[]
}

export default function PersonalInfo() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: 'Ritik',
            email: '',
            phone: ['3435', ''],
            socials: {
                twitter: '',
                linkedin: 'https://www.linkedin.com/in/ritikjadhav/',
            },
            skills: [{ skill: '' }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: 'skills',
        control,
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='grid justify-items-center'
                noValidate
            >
                <div className='my-2'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='block border-2 border-black rounded-md p-2 mb-1'
                        {...register('name', { required: 'Name is required' })}
                    />
                    <p className='text-red-600'>{errors.name?.message}</p>
                </div>

                <div className='my-2'>
                    <input
                        type='email'
                        placeholder='Email'
                        className='block border-2 border-black rounded-md p-2 mb-1'
                        {...register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                message: 'Enter valid email',
                            },
                        })}
                    />
                    <p className='text-red-600'>{errors.email?.message}</p>
                </div>

                <div className='my-2'>
                    <input
                        type='number'
                        placeholder='Primary Phone'
                        className='block border-2 border-black rounded-md p-2 mb-1'
                        {...register('phone.0', {
                            required: 'Phone no. is required',
                        })}
                    />
                    <p className='text-red-600'>{errors.phone?.message}</p>
                </div>

                <div className='my-2'>
                    <input
                        type='number'
                        placeholder='Secondary Phone'
                        className='block border-2 border-black rounded-md p-2 mb-1'
                        {...register('phone.1', {
                            required: 'Phone no. is required',
                        })}
                    />
                    <p className='text-red-600'>{errors.phone?.message}</p>
                </div>

                <div className='my-2'>
                    <input
                        type='text'
                        placeholder='Twitter'
                        className='block border-2 border-black rounded-md p-2 mb-1'
                        {...register('socials.linkedin')}
                    />
                    <p className='text-red-600'>{errors.phone?.message}</p>
                </div>

                <div className='my-2 grid justify-items-center'>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className='grid justify-items-center'>
                                <input
                                    type='text' className='block border-2 border-black rounded-md p-2 mb-1'
                                    {...register(
                                        `skills.${index}.skill` as const
                                    )}
                                />
                                {index > 0 && (
                                    <button
                                        type='button'
                                        onClick={() => remove(index)}
                                        className='border-2 rounded-md bg-sky-500/75 text-white font-medium py-2 px-3 m-2'
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        )
                    })}
                    <button
                        type='button'
                        onClick={() => append({ skill: '' })}
                        className='border-2 rounded-md bg-sky-500/75 text-white font-medium py-2 px-3 m-2'
                    >
                        Add skill
                    </button>
                </div>

                <button
                    type='submit'
                    className='border-2 rounded-md bg-indigo-500 text-white font-medium py-3 px-6 m-4'
                >
                    Submit
                </button>
            </form>
            <DevTool control={control} />
        </div>
    )
}
