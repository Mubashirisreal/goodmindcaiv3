import Link from 'next/link';

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thank You!</h2>
        <p className="mt-2 text-sm text-gray-600">
          We appreciate your feedback. It helps us improve our service.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--button-bg)] hover:bg-[#134d13]"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}