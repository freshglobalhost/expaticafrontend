import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function TelegramButton() {
  return (
    <Link
      href="https://t.me/Trading123563"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-20 z-40 flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on Telegram"
    >
      <MessageCircle size={24} />
    </Link>
  );
}
