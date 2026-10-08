"use client";

import { useState } from "react";
import { feedbackSchema } from "@/lib/validations/feedback"; 

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ phone: "", content: "" });
  const [errors, setErrors] = useState<{ phone?: string; content?: string }>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false); // Reset trạng thái
    setErrors({});     // Xóa lỗi cũ

    // Dùng Zod để kiểm tra tính hợp lệ của dữ liệu đầu vào
    const validationResult = feedbackSchema.safeParse(formData);

    if (!validationResult.success) {
      // Nếu dữ liệu sai, trích xuất lỗi và đưa vào state để hiển thị lên UI
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        phone: fieldErrors.phone?.[0],
        content: fieldErrors.content?.[0],
      });
      return;
    }

    // Nếu dữ liệu vượt qua validation
    setSuccess(true);
    console.log("Dữ liệu hợp lệ:", validationResult.data);
    
    // Tại đây bạn có thể gọi Server Action để lưu vào Database sau này
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-4">Góp ý khách hàng</h2>

      {/* Trường Số điện thoại */}
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Số điện thoại</label>
        <input
          id="phone"
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
            errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
          }`}
          placeholder="Ví dụ: 0912345678"
        />
        {/* Vùng hiển thị lỗi số điện thoại */}
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Trường Nội dung */}
      <div className="mb-4">
        <label htmlFor="content" className="block mb-1 font-medium text-gray-700">Nội dung</label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
            errors.content ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
          }`}
          rows={5}
          placeholder="Nhập nội dung góp ý của bạn..."
        />
        {/* Vùng hiển thị lỗi nội dung */}
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
        Gửi góp ý
      </button>

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
          Form hợp lệ! Dữ liệu của bạn đã được tiếp nhận.
        </div>
      )}
    </form>
  );
}