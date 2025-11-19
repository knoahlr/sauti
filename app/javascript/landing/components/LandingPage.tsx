import type React from 'react';
import { useCallback } from 'react';

import KenyaCountiesMap from '../../mastodon/features/about/components/kenya_counties_map';

export const LandingPage: React.FC = () => {
  const handleCountySelect = useCallback((countyName: string) => {
    if (!countyName) return;

    const slug = countyName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    // Navigate to explore page with county parameter
    window.location.href = `/explore?county=${encodeURIComponent(slug)}`;
  }, []);

  const handleExploreAll = useCallback(() => {
    window.location.href = '/explore';
  }, []);

  return (
    <div className='landing-container'>
      <div className='landing-split'>
        <div className='landing-map-side'>
          <div className='landing-content'>
            <h1 className='landing-title'>Select Your County</h1>
            <p className='landing-subtitle'>
              Explore civic conversations and community engagement across Kenya
            </p>

            <div className='landing-map-wrapper'>
              <KenyaCountiesMap
                selectedCounty={null}
                onCountySelect={handleCountySelect}
                loadingLabel='Loading county map...'
              />
            </div>

            <p className='landing-instruction'>
              Click any county to view civic conversations from that region
            </p>

            <button
              className='landing-button landing-button-explore'
              onClick={handleExploreAll}
            >
              Explore All Kenya
            </button>
          </div>
        </div>

        <div className='landing-signup-side'>
          <div className='landing-signup-card'>
            <h2 className='landing-signup-title'>Join Sauti</h2>
            <p className='landing-signup-description'>
              Create an account to participate in civic discussions, join county
              conversations, and make your voice heard.
            </p>
            <div className='landing-signup-actions'>
              <a
                href='/auth/sign_up'
                className='landing-button landing-button-primary'
              >
                Create Account
              </a>
              <a
                href='/auth/sign_in'
                className='landing-button landing-button-secondary'
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
