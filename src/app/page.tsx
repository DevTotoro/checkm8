import { Button } from '~/components/ui/button';
import { ModeToggle } from '~/components/theme/mode-toggle';

const HomePage = () => {
  return (
    <main className='flex h-screen flex-col items-center justify-center gap-3'>
      <h1 className='text-3xl font-semibold'>checkm8</h1>
      <p className='text-md font-extralight'>Ticking Off Success</p>

      <div className='flex gap-3'>
        <Button>shadcn/ui</Button>
        <ModeToggle />
      </div>
    </main>
  );
};

export default HomePage;
