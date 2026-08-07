import Image from 'next/image';
import { siteMetadata } from '@/data/siteMetadata';

export function Avatar() {
  return (
    <div className="relative w-fit self-start scale-100 transition-all duration-200 ease-out hover:scale-[1.02]">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-2xl bg-primary/15 blur-xl"
      />
      <div className="flex justify-center overflow-hidden rounded-md border border-primary/30 transition-all duration-200 ease-out">
        <Image src={siteMetadata.socialBanner} alt="avatar" width={350} height={350}/>
      </div>
    </div>
  );
};
