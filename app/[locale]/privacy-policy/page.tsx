import { generatePageSeo } from '@/utils/seo'
import { privacyPolicyConfig, LocaleType } from '@/data/config'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: privacyPolicyConfig.title[params.locale] })
}

const content: { [locale in LocaleType]: { updated: string; body: React.ReactNode } } = {
  vi: {
    updated: 'Cập nhật lần cuối: 24 tháng 7, 2026',
    body: (
      <>
        <p>
          Đây là blog cá nhân của Trần Thanh Tùng (tungtt.dev). Trang chính sách này giải thích
          những thông tin nào được thu thập khi bạn ghé thăm trang, và vì mục đích gì.
        </p>

        <h2>1. Thông tin được thu thập</h2>
        <p>
          Bản thân trang web này không có hệ thống đăng ký tài khoản, không có form thu thập
          thông tin cá nhân, và không lưu trữ dữ liệu người dùng trên máy chủ riêng. Một số thông
          tin có thể được thu thập gián tiếp thông qua các dịch vụ bên thứ ba được nhúng trên
          trang, cụ thể như bên dưới.

        </p>

        <h2>2. Các dịch vụ bên thứ ba</h2>
        <ul>
          <li>
            <strong>Vercel Analytics</strong>: thu thập số liệu truy cập ẩn danh (số lượt xem
            trang, trang được xem, thiết bị/trình duyệt ở mức tổng quát) để mình hiểu bài viết
            nào được quan tâm. Không gắn với danh tính cá nhân của bạn.
          </li>
          <li>
            <strong>Bình luận (Cusdis)</strong>: phần bình luận dưới mỗi bài viết dùng Cusdis, một
            dịch vụ bình luận nhẹ và tôn trọng quyền riêng tư. Nếu bạn để lại bình luận, bạn cần
            cung cấp tên và email - email chỉ dùng để hiển thị (qua Gravatar) và không hiển thị
            công khai, dữ liệu bình luận do Cusdis xử lý theo{' '}
            <a href="https://cusdis.com/privacy-policy" target="_blank" rel="noreferrer">
              chính sách riêng tư của Cusdis
            </a>.
          </li>
        </ul>

        <h2>3. Mục đích sử dụng</h2>
        <p>
          Dữ liệu thu thập được (chủ yếu là số liệu truy cập ẩn danh) chỉ nhằm mục đích cải thiện
          nội dung và trải nghiệm đọc trên blog. Mình không bán, cho thuê, hay chia sẻ bất kỳ
          thông tin nào cho bên thứ ba ngoài các dịch vụ đã nêu ở trên.
        </p>

        <h2>4. Quyền của bạn</h2>
        <p>
          Bạn có thể đơn giản là không sử dụng phần bình luận nếu không muốn cung cấp tên/email
          cho Cusdis xử lý. Việc đọc bài viết trên blog không yêu cầu bất kỳ thông tin cá nhân nào.
        </p>

        <h2>5. Liên hệ</h2>
        <p>
          Nếu bạn có câu hỏi về chính sách này, vui lòng liên hệ qua email{' '}
          <a href="mailto:tunglol1024@gmail.com">tunglol1024@gmail.com</a>.
        </p>
      </>
    ),
  },
  en: {
    updated: 'Last updated: July 24, 2026',
    body: (
      <>
        <p>
          This is the personal blog of Tran Thanh Tung (tungtt.dev). This page explains what
          information is collected when you visit the site, and for what purpose.
        </p>

        <h2>1. Information collected</h2>
        <p>
          This site itself has no account system, no forms collecting personal information, and
          does not store user data on its own servers. Some information may be collected
          indirectly through third-party services embedded on the site, as described below.
        </p>

        <h2>2. Third-party services</h2>
        <ul>
          <li>
            <strong>Vercel Analytics</strong>: collects anonymized visit metrics (page views,
            which pages are viewed, general device/browser info) to help understand which posts
            are of interest. Not tied to your personal identity.
          </li>
          <li>
            <strong>Comments (Cusdis)</strong>: the comment section under each post uses Cusdis, a
            lightweight, privacy-respecting comment service. Leaving a comment requires a name and
            an email - the email is only used for display (via Gravatar) and is never shown
            publicly. Comment data is handled by Cusdis under its{' '}
            <a href="https://cusdis.com/privacy-policy" target="_blank" rel="noreferrer">
              privacy policy
            </a>.
          </li>
        </ul>

        <h2>3. How the data is used</h2>
        <p>
          The data collected (mostly anonymized visit metrics) is only used to improve the
          content and reading experience on this blog. I do not sell, rent, or share any
          information with third parties beyond the services listed above.
        </p>

        <h2>4. Your choices</h2>
        <p>
          You can simply avoid using the comment section if you&apos;d rather not have Cusdis
          process your name/email. Reading posts on this blog does not require any personal
          information.
        </p>

        <h2>5. Contact</h2>
        <p>
          If you have any questions about this policy, feel free to reach out at{' '}
          <a href="mailto:tunglol1024@gmail.com">tunglol1024@gmail.com</a>.
        </p>
      </>
    ),
  },
}

export default function Page({ params }: { params: { locale: LocaleType } }) {
  const { updated, body } = content[params.locale]
  return (
    <div className="pt-12">
      <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-100 sm:text-4xl">
        {privacyPolicyConfig.title[params.locale]}
      </h1>
      <p className="mt-2 text-sm text-gray-400">{updated}</p>
      <div className="prose max-w-none pb-16 pt-6">{body}</div>
    </div>
  )
}
