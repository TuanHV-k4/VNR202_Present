---
name: frontend-anti-slop-design
description: Dùng skill này bất cứ khi nào xây dựng hoặc chỉnh sửa giao diện web/app (landing page, dashboard, form, trang sản phẩm, component UI...) và cần giao diện trông chuyên nghiệp, có chủ đích — không phải kiểu "AI làm cho có", dùng icon lung tung, gradient tím mặc định, hay bố cục rập khuôn. Kích hoạt khi thấy từ khóa "giao diện", "UI", "UX", "landing page", "thiết kế web", "frontend", "component", hoặc khi người dùng chê giao diện "xấu", "ẩu", "giống AI làm", "template quá". Dùng chung với skill frontend-design (nếu có) — skill này bổ sung phần NHẬN DIỆN và TRÁNH các dấu hiệu "AI slop" cụ thể, còn frontend-design tập trung vào quy trình thiết kế tổng thể.
---

# Thiết kế Frontend không "sến", không "AI slop"

## Vấn đề đang giải quyết

Giao diện do AI làm ẩu thường KHÔNG sai kỹ thuật (code chạy được, responsive được) — cái xấu nằm ở việc dùng **default của thư viện** thay vì **quyết định có chủ đích**. Bất kỳ ai làm nhiều với AI đều nhận ra ngay các dấu hiệu quen mặt bên dưới. Mục tiêu của skill này: nhận diện và né các dấu hiệu đó, thay bằng lựa chọn thật sự phù hợp với nội dung/thương hiệu đang làm.

## 1. Danh sách "mùi AI slop" cần tự kiểm tra và tránh

### Icon
- **Đừng rải icon Lucide/Heroicons/FontAwesome mặc định lên mọi tiêu đề mục** chỉ để "cho có hình". Icon phải minh họa đúng khái niệm, không phải trang trí lấp chỗ trống. Nếu bỏ icon đi mà không mất thông tin gì → bỏ icon đó.
- Đừng dùng emoji (🚀 ✨ 🎯 💡 🔥) làm icon trong UI sản phẩm nghiêm túc — trông như slide thuyết trình sinh viên, không phải sản phẩm thật. Emoji chỉ hợp với UI thật sự thân thiện/vui (app cá nhân, chat casual).
- Nếu cần icon set, chọn 1 bộ nhất quán về style (stroke-width, corner radius) suốt toàn bộ giao diện — không trộn icon outline với icon filled, không trộn nhiều nguồn khác nhau.
- Icon chỉ nên **hỗ trợ** văn bản, hiếm khi đứng một mình thay thế label — icon-only button luôn cần `aria-label`/tooltip.

### Bố cục rập khuôn (cliché layout)
- **"Feature grid 3 cột: icon tròn nền màu nhạt + heading + đoạn mô tả ngắn"** lặp lại y hệt nhau — đây là bố cục AI dùng nhiều nhất khi không nghĩ gì thêm. Chỉ dùng nếu 3 tính năng thực sự song song và độc lập; nếu không, tìm cấu trúc khác (bảng so sánh, timeline, câu chuyện tuần tự, bento grid không đều nhau).
- **Badge pill nhỏ phía trên hero** kiểu "🚀 Mới ra mắt" / "✨ Powered by AI" — mặc định gần như mọi landing AI-generated đều có. Chỉ dùng nếu thật sự có thông báo cần nhấn mạnh, không dùng làm trang trí.
- Đánh số 01 / 02 / 03 cho mọi danh sách — chỉ hợp lý khi nội dung THẬT SỰ có trình tự (quy trình, các bước). Danh sách tính năng song song không có thứ tự thì đừng đánh số.
- Card đồng dạng tuyệt đối (cùng kích thước, cùng bóng đổ, cùng bo góc) xếp đều tăm tắp — thử phá nhịp bằng kích thước khác nhau (bento layout), hoặc căn lệch có chủ đích.

### Màu sắc mặc định
- 3 "công thức màu" bị lạm dụng nhất hiện nay, cần chủ động tránh trừ khi brief yêu cầu đúng cái đó:
  1. Nền kem ấm (~#F4F1EA) + serif tương phản cao + màu nhấn cam đất (~#D97757)
  2. Nền gần đen + 1 màu nhấn xanh lá/đỏ tươi chói
  3. Bố cục kiểu báo in: đường kẻ mảnh, bo góc = 0, cột dày đặc kiểu newspaper
- **Gradient tím-hồng-xanh (`from-purple-500 to-pink-500` hoặc tương tự)** trên nút CTA/hero — dấu hiệu nhận diện tức thì của "AI/SaaS template". Nếu dùng gradient, phải lấy màu từ bảng màu thương hiệu cụ thể, không dùng cặp màu Tailwind default.
- Luôn tự đặt bảng màu gồm 4-6 mã hex cụ thể, đặt tên vai trò rõ ràng (primary, accent, surface, ink...) TRƯỚC khi code, suy ra từ chủ đề/thương hiệu — không chọn màu ngẫu hứng lúc code.

### Typography
- Đừng mặc định `font-sans` hệ thống hoặc luôn luôn Inter cho mọi dự án — Inter là default an toàn nhưng vì thế cũng là "không quyết định gì cả". Chọn cặp font có chủ đích: 1 font display có cá tính (dùng tiết chế cho heading) + 1 font body dễ đọc, khác nhau về "giọng điệu" thay vì cùng họ.
- Thiết lập type scale rõ ràng (vd 12/14/16/20/28/40/56px hoặc tỷ lệ modular), không dùng tuỳ tiện text-lg/text-xl rải rác không theo hệ thống.
- Với nội dung tiếng Việt: LUÔN kiểm tra font có hỗ trợ đầy đủ dấu tiếng Việt (ư, ơ, ă, đ, các dấu thanh) trước khi chọn — nhiều font display đẹp trên Google Fonts không có bộ Vietnamese subset, dấu bị vỡ/lệch rất xấu.

### Chuyển động (animation)
- Animation rải rác khắp nơi (mọi thứ đều fade-in khi scroll, mọi card đều hover scale lên) làm giao diện trông "nhồi hiệu ứng để che nội dung yếu". Chọn 1-2 khoảnh khắc chuyển động có chủ đích (page load, 1 hero interaction) thay vì rắc animation lên mọi phần tử.
- Tôn trọng `prefers-reduced-motion`.
- Easing luôn tự nhiên (`ease-out`, cubic-bezier tùy chỉnh), không dùng `linear` cho UI motion.

### Bóng đổ, bo góc, viền
- `shadow-lg` + `rounded-xl` áp cho MỌI card/button là default của Tailwind/shadcn khi không chỉnh gì — dùng được nhưng nên tự quyết định độ bo góc và độ đổ bóng theo "tính cách" sản phẩm (sản phẩm nghiêm túc/tài chính → bo góc nhỏ, bóng rất nhẹ hoặc dùng border thay bóng; sản phẩm vui vẻ/tiêu dùng → bo tròn nhiều hơn được).
- Đừng đổ bóng cho mọi lớp UI cùng một kiểu — tạo hệ thống elevation (2-3 mức bóng khác nhau cho các tầng khác nhau: card thường / card nổi bật / modal).

### Contrast & khả năng tiếp cận (accessibility) — hay bị bỏ qua khi mải chọn màu đẹp
- Mọi cặp chữ/nền chính phải đạt tối thiểu **WCAG AA: tỉ lệ tương phản ≥ 4.5:1** cho chữ thường, **≥ 3:1** cho chữ lớn (≥24px hoặc ≥19px in đậm) và cho icon/thành phần đồ họa quan trọng. Kiểm tra bằng công cụ (vd WebAIM Contrast Checker) ngay khi chốt bảng màu ở bước design token, không đợi build xong mới kiểm tra.
- Lỗi thường gặp: chữ xám nhạt (#999) trên nền trắng để "tinh tế" — thường KHÔNG đạt AA, chỉ dùng cho text phụ không quan trọng (caption, placeholder), không dùng cho nội dung chính.
- Đừng dùng màu sắc làm cách DUY NHẤT truyền đạt thông tin (vd chỉ tô đỏ/xanh để báo lỗi/thành công mà không có icon hoặc chữ kèm theo) — người mù màu không phân biệt được.
- Trạng thái `:focus-visible` phải luôn hiện rõ ràng (viền/outline tương phản đủ mạnh), không bao giờ `outline: none` mà không thay bằng focus style khác — đây là lỗi phổ biến khiến UI đẹp nhưng không dùng được bằng bàn phím.
- Test nhanh: chuyển toàn bộ ảnh chụp màn hình sang grayscale — nếu các thành phần quan trọng biến mất/khó phân biệt, contrast đang có vấn đề.

### Dark mode — không phải chỉ đảo màu nền/chữ
- Đừng làm dark mode bằng cách invert đơn giản (nền trắng→đen, chữ đen→trắng, giữ nguyên màu accent) — màu bão hòa cao (accent rực) trên nền tối dễ gây chói mắt và "rung" hình ảnh. Giảm độ bão hòa (saturation) và tăng nhẹ độ sáng của các màu accent khi chuyển sang dark mode.
- Nền tối không nên dùng đen tuyệt đối `#000000` — dùng xám rất đậm (vd `#0A0A0B`, `#121214`) để đỡ gắt và bóng đổ vẫn có thể nhìn thấy được.
- Elevation trong dark mode thể hiện bằng độ sáng bề mặt tăng dần (surface càng nổi càng sáng hơn 1 chút), không chỉ dựa vào bóng đổ như light mode vì bóng gần như vô hình trên nền tối.
- Ảnh/icon có nền trong suốt cần kiểm tra riêng trên cả 2 theme — logo màu đậm vẽ cho light mode có thể biến mất trên nền tối.
- Nếu hỗ trợ cả 2 theme, định nghĩa design token dạng biến (CSS variables/Tailwind theme) ngay từ đầu, không hardcode màu trực tiếp trong component — để đổi theme không phải sửa từng chỗ.

## 2. Quy trình thiết kế trước khi code (bắt buộc, không nhảy thẳng vào code)

1. **Định danh chủ đề & đối tượng**: sản phẩm là gì, người dùng là ai, trang này phải làm được đúng 1 việc gì.
2. **Chốt design token TRƯỚC**, viết ra thành bảng, không quyết định ngẫu hứng lúc viết code:
   - Màu: 4-6 mã hex có tên vai trò
   - Font: 2 (tối đa 3) họ chữ, kèm vai trò từng loại
   - Spacing scale: 1 hệ số cố định (vd bội số của 4px hoặc 8px)
   - Bo góc & bóng đổ: định nghĩa 2-3 mức, dùng nhất quán
   - Icon: chọn 1 bộ, xác định khi nào dùng/không dùng
3. **Chọn 1 "signature element"** — 1 điểm nhấn duy nhất khiến trang này khác mọi trang khác (không phải hiệu ứng ở khắp nơi, mà 1 chỗ được đầu tư kỹ, phần còn lại giữ im lặng, tiết chế).
4. **Tự phản biện trước khi build**: hỏi "nếu prompt này đưa cho AI khác/lần khác, họ có ra kết quả y hệt không?" — nếu có, phần đó đang là default, cần đổi.
5. Build theo đúng token đã chốt — không tự ý thêm màu/font/spacing ngoài hệ thống giữa chừng.
6. **Tự chụp/xem lại và cắt bớt**: sau khi build xong, tìm ít nhất 1 chi tiết trang trí để BỎ ĐI (giống nguyên tắc "trước khi ra khỏi nhà, bỏ bớt 1 món phụ kiện" của Coco Chanel).

## 3. Nội dung chữ (copywriting) cũng là thiết kế

- Viết từ góc nhìn người dùng cuối, gọi tên đúng thứ họ thao tác ("Lưu thay đổi" không phải "Submit"/"Gửi dữ liệu")
- Nút hành động và thông báo kết quả phải khớp từ vựng xuyên suốt: nút "Xuất bản" → thông báo phải là "Đã xuất bản", không đổi thành từ khác
- Trạng thái rỗng (empty state) và lỗi phải hướng dẫn hành động tiếp theo, không chỉ báo lỗi suông ("Không tìm thấy kết quả" → nên kèm gợi ý thử lại thế nào)
- Tránh copy sáo rỗng kiểu marketing AI hay dùng: "Trải nghiệm đỉnh cao", "Giải pháp toàn diện", "Đưa X lên tầm cao mới" — viết cụ thể, thật, tránh tính từ rỗng nghĩa

## 4. Ví dụ code: "làm ẩu" vs "có chủ đích"

### Ví dụ 1 — nút CTA
```html
<!-- ❌ Làm ẩu: gradient Tailwind default, bo góc/bóng mặc định, không rõ vai trò màu -->
<button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white
  rounded-xl shadow-lg px-6 py-3 hover:scale-105 transition">
  🚀 Bắt đầu ngay
</button>

<!-- ✅ Có chủ đích: màu lấy từ token thương hiệu, bo góc/bóng theo hệ thống đã chốt,
     copy cụ thể theo hành động thật, contrast đã kiểm tra đạt AA -->
<button class="bg-[--color-primary] text-[--color-on-primary]
  rounded-[--radius-sm] shadow-[--elevation-1] px-6 py-3
  hover:bg-[--color-primary-hover] transition-colors">
  Tạo tài khoản miễn phí
</button>
```

### Ví dụ 2 — khối "feature" 3 cột
```html
<!-- ❌ Làm ẩu: icon tròn nền nhạt lặp lại y hệt, đánh số vô nghĩa vì 3 mục không có trình tự -->
<div class="grid grid-cols-3 gap-6">
  <div><span class="text-2xl">01 🎯</span><h3>Nhanh chóng</h3><p>Trải nghiệm đỉnh cao...</p></div>
  <div><span class="text-2xl">02 ✨</span><h3>Đơn giản</h3><p>Giải pháp toàn diện...</p></div>
  <div><span class="text-2xl">03 🔥</span><h3>Hiệu quả</h3><p>Đưa doanh nghiệp lên tầm cao mới...</p></div>
</div>

<!-- ✅ Có chủ đích: nếu 3 mục thật sự song song (không có thứ tự), bỏ số thứ tự,
     bỏ icon trang trí, dùng số liệu/nội dung cụ thể thay cho tính từ sáo rỗng -->
<div class="grid grid-cols-3 gap-6 divide-x divide-[--color-border]">
  <div class="px-6"><p class="text-4xl font-display">1.2s</p><p>Thời gian tải trang trung bình</p></div>
  <div class="px-6"><p class="text-4xl font-display">99.9%</p><p>Uptime trong 12 tháng qua</p></div>
  <div class="px-6"><p class="text-4xl font-display">40+</p><p>Tích hợp có sẵn</p></div>
</div>
```

## 5. Checklist tự kiểm tra trước khi giao

- [ ] Không có icon nào chỉ để "lấp chỗ trống" — mọi icon đều minh họa đúng nghĩa
- [ ] Không dùng emoji làm icon UI (trừ khi sản phẩm chủ đích thân thiện/casual)
- [ ] Không phải 1 trong 3 công thức màu AI-mặc-định ở mục 1, trừ khi brief yêu cầu đúng vậy
- [ ] Không có gradient tím-hồng Tailwind-default trên CTA
- [ ] Bảng màu đã được đặt tên vai trò rõ ràng, đến từ chủ đề cụ thể, không ngẫu hứng
- [ ] Font đã kiểm tra hỗ trợ tiếng Việt đầy đủ dấu (nếu nội dung tiếng Việt)
- [ ] Feature grid 3-cột-đều-nhau chỉ dùng khi nội dung thật sự song song; nếu không, đã đổi bố cục khác
- [ ] Đánh số 01/02/03 chỉ khi nội dung thật sự có trình tự
- [ ] Có đúng 1 "signature element" được đầu tư kỹ, phần còn lại tiết chế — không animation/hiệu ứng rải khắp nơi
- [ ] Đã thử bỏ bớt ít nhất 1 chi tiết trang trí thừa trước khi giao
- [ ] Contrast chữ/nền đạt WCAG AA (≥4.5:1 chữ thường, ≥3:1 chữ lớn) — đã kiểm tra bằng công cụ, không đoán bằng mắt
- [ ] Không dùng màu làm cách duy nhất truyền đạt thông tin (lỗi/thành công có kèm icon/chữ, không chỉ đổi màu)
- [ ] `:focus-visible` hiển thị rõ ràng ở mọi phần tử tương tác, không bị `outline: none` mà không thay thế
- [ ] Nếu có dark mode: đã giảm saturation màu accent, nền không dùng đen tuyệt đối, elevation thể hiện bằng độ sáng bề mặt, đã test riêng logo/ảnh trên cả 2 theme
- [ ] Responsive test ở mobile, tôn trọng `prefers-reduced-motion`
- [ ] Copy trong UI cụ thể, đúng từ vựng nhất quán, không sáo rỗng

## 6. Tham khảo nhanh — vài hướng đi thay thế cho các mặc định phổ biến

| Thay vì (default AI hay chọn) | Thử thay bằng |
|---|---|
| Feature grid 3 cột đều | Bento grid không đều, bảng so sánh, timeline kể chuyện |
| Icon Lucide cho mọi mục | Minh họa custom nhỏ, số liệu thật, ảnh chụp thật, hoặc bỏ hẳn |
| Gradient tím-hồng | Gradient từ 2 màu trong chính bảng màu thương hiệu, hoặc màu phẳng |
| Nền kem + serif + cam đất | Bảng màu tự suy ra từ chủ đề cụ thể của dự án |
| Badge "🚀 Mới" trang trí | Bỏ hẳn, hoặc chỉ dùng khi có thông báo thật |
| Card shadow-lg rounded-xl đồng loạt | Hệ elevation 2-3 mức, bo góc theo tính cách sản phẩm |
| Animation fade-in mọi thứ khi scroll | 1 khoảnh khắc chuyển động được đầu tư, còn lại tĩnh |
