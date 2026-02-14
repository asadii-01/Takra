import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatPage() {
  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">
        Community
      </h1>
      <ChatWindow />
    </div>
  );
}
