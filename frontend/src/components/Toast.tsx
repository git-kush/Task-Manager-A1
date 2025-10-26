interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

function Toast({ message, type }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`glass-strong rounded-xl px-6 py-4 shadow-2xl flex items-center gap-3 ${
          type === 'success' ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400'
        }`}
      >
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <p className="text-white text-sm font-light">{message}</p>
      </div>
    </div>
  );
}

export default Toast;
