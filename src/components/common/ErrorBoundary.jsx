import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#FAF9F5]">
          <div className="max-w-md w-full text-center space-y-4 p-8 bg-white border border-luxury-border rounded-xs shadow-xl">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                {siteConfig.brand.name}
              </span>
              <h2 className="font-serif text-2xl font-bold text-luxury-black mt-1">
                Something went wrong
              </h2>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              An unexpected error occurred while rendering this view. Our engineering team has been notified.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-luxury py-2.5 px-4 text-[11px] inline-flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleReset}
                className="btn-luxury-outline py-2.5 px-4 text-[11px] inline-flex items-center justify-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
