'use client'
import ThemeToggle from '@/components/theme-toggle';
import PersonalInfo from '@/components/user/personal-info';

export default function Home() {
  return (
    <div>
      <div className='flex justify-between bg-white dark:bg-800 p-8 px-16'>
        <div className='text-3xl font-bold text-black dark:text-white'>
          React Hook Form
        </div>
        <div className=''>
          <ThemeToggle />
        </div>
      </div>
      <div className='flex justify-center'>
        <PersonalInfo />
      </div>
    </div>
  );
}
