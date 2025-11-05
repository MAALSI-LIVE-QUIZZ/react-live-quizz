export const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="text-center">
      <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
      <p className="text-lg text-gray-600">Chargement du quiz...</p>
    </div>
  </div>
);
