/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Feedback() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://hook.eu2.make.com/i1bg6echeoybgrdqlgeab447idd4wk0n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/thank-you');
      } else {
        setSubmitError(`Submission failed: ${response.status} ${response.statusText}`);
        console.error('Error response:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError('Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md">
        <div className="p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Thank you for having a conversation with tara. We would love to hear your feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--button-bg)] focus:ring focus:ring-[var(--button-bg)] focus:ring-opacity-50"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--button-bg)] focus:ring focus:ring-[var(--button-bg)] focus:ring-opacity-50"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--button-bg)] focus:ring focus:ring-[var(--button-bg)] focus:ring-opacity-50"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              />
            </div>
            {submitError && (
              <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
                {submitError}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md border border-transparent bg-[var(--button-bg)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#134d13] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}