import Image from 'next/image'
import Link from 'next/link'
import { Twemoji } from '@/components/common/Twemoji'

export default function FourZeroFour() {

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div>
        <Image src={'/404.png'} alt="404" width={500} height={500} />
      </div>
      <div className="space-x-2 pt-8 md:space-y-5">
        <div className="max-w-md text-center">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            Hmm.. có vẻ như bạn đã bị lạc <Twemoji emoji={'face-with-monocle'} />
          </p>
          <p className="mb-6">Nhưng đừng lo, bạn sẽ tìm thấy nhiều thứ khác ở trang chủ.</p>
          <Link href="/">
            <button className="rounded-lg border border-transparent bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-500">
              Về trang chủ
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
