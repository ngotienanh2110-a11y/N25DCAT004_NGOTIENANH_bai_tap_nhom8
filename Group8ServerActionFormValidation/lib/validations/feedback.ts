import { z } from "zod";

// Regex kiểm tra số điện thoại Việt Nam: 
// Bắt đầu bằng 0, theo sau là các đầu số hợp lệ (3, 5, 7, 8, 9) và 8 chữ số bất kỳ.
const phoneRegex = /^(0)(3|5|7|8|9)[0-9]{8}$/;

export const feedbackSchema = z.object({
  phone: z.string().regex(phoneRegex, {
    message: "Số điện thoại không đúng định dạng Việt Nam.", // Lỗi hiển thị khi sai định dạng số điện thoại
  }),
  content: z.string().min(21, {
    message: "Nội dung phải trên 20 ký tự.", // Đặt min(21) để đảm bảo độ dài > 20 ký tự
  }),
});