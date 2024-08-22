import Image from 'next/image';
import { siteMetadata } from '@/data/siteMetadata';

export function Avatar() {
  return (
    <div className="scale-100 transition-all duration-200 ease-out hover:scale-[1.02]">
      <div className="flex justify-center overflow-hidden rounded-md transition-all duration-200 ease-out">
        <Image src={siteMetadata.socialBanner} alt="avatar" width={350} height={350}/>
      </div>
    </div>
  );
};
