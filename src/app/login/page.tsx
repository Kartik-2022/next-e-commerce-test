    // src/app/login/page.tsx
    'use client'; 

    import { useState } from 'react';
    import { useRouter } from 'next/navigation';
    import { setCookie } from 'cookies-next'; 

    export default function LoginPage() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (email === 'user@example.com' && password === 'password123') {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setCookie('isAuthenticated', 'true', { maxAge: 60 * 60 * 24 }); 
          router.push('/shop');
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setError('Invalid email or password.');
        }
        setLoading(false);
      };

      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to MyShop</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600 text-center">
            user@example.com        password123
            </p>
          </div>
        </div>
      );
    }
    