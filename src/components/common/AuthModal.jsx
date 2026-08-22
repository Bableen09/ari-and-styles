import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { siteConfig } from '../../config/siteConfig';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, fullName: fullName || 'Valued Member' });
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={closeAuthModal} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#FAF9F5] rounded-xs shadow-2xl border border-luxury-border p-6 sm:p-8 z-10 animate-scale-in my-auto">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-luxury-black rounded-full hover:bg-neutral-100"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            {siteConfig.brand.name} Insider
          </span>
          <h3 className="font-serif text-2xl font-bold text-luxury-black mt-1">
            {authMode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {authMode === 'login'
              ? 'Access saved addresses, curated drops, and order tracking.'
              : 'Join the Ari & Styles community for exclusive drops and benefits.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Arjun Singhania"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black">
                Password
              </label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link will be sent to your registered email.')}
                  className="text-[11px] text-neutral-500 hover:text-luxury-black hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-luxury py-3.5 mt-2 flex items-center justify-center gap-2">
            <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-luxury-border text-center text-xs text-neutral-600">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('register')}
                className="font-bold text-luxury-black hover:underline"
              >
                Join Ari & Styles
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('login')}
                className="font-bold text-luxury-black hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
