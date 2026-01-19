import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import * as Sentry from '@sentry/react';

export const SentryUserContext = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      Sentry.setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        username: user.username || undefined,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [isSignedIn, user]);

  return null;
};
