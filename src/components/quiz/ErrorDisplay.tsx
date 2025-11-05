interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay = ({ message }: ErrorDisplayProps) => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="rounded-lg bg-red-50 p-6 text-center">
      <p className="text-red-600">{message}</p>
    </div>
  </div>
);
