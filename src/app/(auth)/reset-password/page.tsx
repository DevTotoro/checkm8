import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'checkm8 • Reset password',
};

const SignUpPage = () => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-3'>
      <h1 className='text-3xl font-semibold'>checkm8</h1>
      <p className='text-md font-extralight'>Ticking Off Success</p>

      <h5 className='mt-5 text-lg font-medium'>Reset password</h5>
    </div>
  );
};

export default SignUpPage;
