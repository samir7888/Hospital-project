import { validateEmail } from '@/components/validation/SubscribeValidation';
import { useState } from 'react';
// import { validateEmail } from '';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async () => {
    // Reset states
    setError('');
    setIsSuccess(false);
    
    // Validate email
    const validation = validateEmail(email);
    
    if (!validation.success) {
      setError(validation.error || '');
      return;
    }
    
    // If validation passes, proceed with subscription
    try {
      setIsSubmitting(true);
      
      // Example API call - replace with your actual subscription API
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // If you had a real API, you'd handle the response here
      // if (!response.ok) throw new Error('Subscription failed');
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success!
      setIsSuccess(true);
      setEmail(''); // Clear email field
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Failed to subscribe. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Clear error when user starts typing again
            if (error) setError('');
          }}
          placeholder="Your email address"
          className={`flex-grow px-4 py-3 rounded-lg border ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } focus:outline-none focus:ring-2`}
          aria-invalid={!!error}
          aria-describedby={error ? "email-error" : undefined}
        />
        <button
          onClick={handleSubscribe}
          disabled={isSubmitting}
          className={`${
            isSubmitting 
              ? 'bg-blue-500 cursor-not-allowed'
              : 'bg-blue-700 cursor-pointer hover:bg-blue-800'
          } text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap`}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <p id="email-error" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {/* Success message */}
      {isSuccess && (
        <p className="mt-2 text-sm text-green-600">
          Thanks for subscribing!
        </p>
      )}
    </div>
  );
}