








export default function Unauthorized() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-sm">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-3">
          You don’t have permission to access this page.
        </p>

        <a
          href="/"
          className="mt-5 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go back Home
        </a>
      </div>
    </div>
  );
}
