import { type SSOCallbackProps, SSOCallback } from '~/components/auth/sso-callback';

const SSOCallbackPage = ({ searchParams }: SSOCallbackProps) => {
  return (
    <div className='container px-0'>
      <div className='mx-auto max-w-lg'>
        <SSOCallback searchParams={searchParams} />
      </div>
    </div>
  );
};

export default SSOCallbackPage;
