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
            <strong>Bình luận qua GitHub (giscus)</strong>: phần bình luận dưới mỗi bài viết sử
            dụng GitHub Discussions. Nếu bạn muốn bình luận bằng cách này, bạn cần đăng nhập bằng
            tài khoản GitHub và dữ liệu đó do GitHub quản lý theo{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noreferrer">
              chính sách riêng tư của GitHub
            </a>.
          </li>
          <li>
            <strong>Bình luận qua Facebook (Facebook Comments Plugin)</strong>: một lựa chọn bình
            luận khác dùng Facebook Comments Plugin. Nếu bạn dùng cách này, Facebook có thể đặt
            cookie và xử lý dữ liệu liên quan theo{' '}
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">
              chính sách riêng tư của Meta/Facebook
            </a>. Trang này không lưu trữ nội dung bình luận, toàn bộ do Facebook quản lý.
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
          Bạn có thể chặn cookie của bên thứ ba (Facebook, GitHub) bằng cài đặt trình duyệt, hoặc
          đơn giản là không sử dụng phần bình luận nếu không muốn các dịch vụ đó xử lý dữ liệu của
          bạn. Việc đọc bài viết trên blog không yêu cầu bất kỳ thông tin cá nhân nào.
        </p>

        <h2 id="xoa-du-lieu">5. Yêu cầu xóa dữ liệu</h2>
        <p>
          Nếu bạn từng bình luận bằng Facebook Comments Plugin trên blog và muốn xóa bình luận đó,
          bạn có thể tự xóa trực tiếp: di chuột vào bình luận của mình, bấm dấu <strong>...</strong>{' '}
          ở góc bình luận và chọn <strong>Xóa</strong>. Toàn bộ dữ liệu bình luận do Facebook lưu
          trữ, blog này không giữ bản sao nào.
        </p>
        <p>
          Nếu bạn muốn yêu cầu xóa bất kỳ dữ liệu nào khác liên quan đến bạn mà blog này có thể có
          (ví dụ qua email liên hệ), vui lòng gửi yêu cầu tới{' '}
          <a href="mailto:tunglol1024@gmail.com">tunglol1024@gmail.com</a>, mình sẽ xử lý trong
          thời gian sớm nhất.
        </p>

        <h2>6. Liên hệ</h2>
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
            <strong>GitHub-based comments (giscus)</strong>: the comment section under each post
            uses GitHub Discussions. To comment this way, you need to sign in with a GitHub
            account, and that data is handled by GitHub under its{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noreferrer">
              privacy statement
            </a>.
          </li>
          <li>
            <strong>Facebook Comments Plugin</strong>: an alternative way to comment using the
            Facebook Comments Plugin. If you use it, Facebook may set cookies and process related
            data under{' '}
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">
              Meta/Facebook&apos;s privacy policy
            </a>. This site does not store any comment content - it is entirely managed by
            Facebook.
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
          You can block third-party cookies (Facebook, GitHub) through your browser settings, or
          simply avoid using the comment section if you&apos;d rather not have those services process
          your data. Reading posts on this blog does not require any personal information.
        </p>

        <h2 id="data-deletion">5. Data deletion request</h2>
        <p>
          If you have left a comment using the Facebook Comments Plugin on this blog and want to
          delete it, you can do so yourself: hover over your comment, click the{' '}
          <strong>...</strong> icon in the corner, and select <strong>Delete</strong>. All comment
          data is stored by Facebook - this blog does not keep a copy of it.
        </p>
        <p>
          If you&apos;d like to request the deletion of any other data related to you that this
          blog might have (for example through a contact email), please send a request to{' '}
          <a href="mailto:tunglol1024@gmail.com">tunglol1024@gmail.com</a> and it will be handled
          as soon as possible.
        </p>

        <h2>6. Contact</h2>
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
