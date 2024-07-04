'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const userDetailsSchema = z.object({
    name: z.string().min(3, { message: 'Must be 3 or more characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.array(z.string()),
    socials: z.object({
        twitter: z.string(),
        linkedin: z.string(),
    }),
    skills: z.array(z.object({ skill: z.string() })).nonempty(),
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
    } = useForm({
        resolver: zodResolver(userDetailsSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: ['', ''],
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

    useEffect(() => {
        fields.forEach((field, index) => {
            console.log(field.skill, 'field')
        })
    }, [fields])

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-6'
                noValidate
            >
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ritik Jadhav" required
                        {...register('name', { required: 'Name is required' })} />
                    <p className='mt-2 text-sm text-red-600 font-medium dark:text-red-500'>{errors.name?.message}</p>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required
                        {...register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                message: 'Enter valid email',
                            },
                        })} />
                    <p className='mt-2 text-sm text-red-600 font-medium dark:text-red-500'>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input type="number" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Primary phone" required
                        {...register('phone.1', {
                            required: 'Phone number is required',
                        })} />
                    <p className='mt-2 text-sm text-red-600 font-medium dark:text-red-500'>{errors.phone?.message}</p>
                </div>
                <div>
                    <label htmlFor="socials" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your LinkedIn</label>
                    <input type="text" id="socials" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="LinkedIn" required
                        {...register('socials.linkedin')} />
                </div>
                <div>
                    <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Skills</label>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id}>
                                <input
                                    type='text'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-2'
                                    {...register(
                                        `skills.${index}.skill` as const
                                    )}
                                />
                                {index > 0 && (
                                    <button
                                        type='button'
                                        onClick={() => remove(index)}
                                        className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2'
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
                        className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2'
                    >
                        Add skill
                    </button>
                </div>

                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}
