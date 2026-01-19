import { Component, type ErrorInfo, type ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  eventId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Send to Sentry with additional context
    Sentry.withScope((scope) => {
      scope.setTag('error_boundary', 'true');
      scope.setContext('react', {
        componentStack: errorInfo.componentStack,
      });

      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });

    // Call onError callback if provided
    this.props.onError?.(error);

    // Keep console logging for development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, eventId: null });
  };

  handleReportFeedback = (): void => {
    if (this.state.eventId) {
      Sentry.showReportDialog({ eventId: this.state.eventId });
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-background flex min-h-screen items-center justify-center p-4">
          <div className="border-border bg-card w-full max-w-md rounded-lg border p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
                <AlertTriangle className="text-destructive h-6 w-6" />
              </div>
              <div>
                <h2 className="text-foreground text-lg font-semibold">Something went wrong</h2>
                <p className="text-muted-foreground text-sm">An unexpected error occurred</p>
              </div>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className="bg-muted mb-4 rounded-md p-3">
                <p className="text-muted-foreground font-mono text-xs">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button onClick={this.handleReset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>

              <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload page
              </Button>

              <Button
                variant="ghost"
                onClick={() => (window.location.href = '/')}
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to homepage
              </Button>

              {this.state.eventId && (
                <Button
                  variant="link"
                  onClick={this.handleReportFeedback}
                  className="w-full text-sm"
                >
                  Report this issue
                </Button>
              )}
            </div>

            {this.state.eventId && (
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Error ID: {this.state.eventId}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
