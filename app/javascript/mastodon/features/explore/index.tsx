import { useCallback, useMemo, useRef } from 'react';

import { defineMessages, useIntl, FormattedMessage } from 'react-intl';

import { Helmet } from 'react-helmet';
import { NavLink, Switch, Route, useLocation, Link } from 'react-router-dom';

import TrendingUpIcon from '@/material-icons/400-24px/trending_up.svg?react';
import { Column } from 'mastodon/components/column';
import type { ColumnRef } from 'mastodon/components/column';
import { ColumnHeader } from 'mastodon/components/column_header';
import { SymbolLogo } from 'mastodon/components/logo';
import { Search } from 'mastodon/features/compose/components/search';
import { useBreakpoint } from 'mastodon/features/ui/hooks/useBreakpoint';
import { useIdentity } from 'mastodon/identity_context';

import Links from './links';
import Statuses from './statuses';
import Suggestions from './suggestions';
import Tags from './tags';

const messages = defineMessages({
  title: { id: 'explore.title', defaultMessage: 'Trending' },
  countyBanner: {
    id: 'explore.county_banner',
    defaultMessage: 'Showing civic activity for {county}',
  },
  countyBannerAction: {
    id: 'explore.county_banner.clear',
    defaultMessage: 'See all Kenya conversations',
  },
});

const toCountyLabel = (slug?: string | null) => {
  if (!slug) return null;

  return slug
    .split('-')
    .map((part) =>
      part.length > 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part,
    )
    .join(' ');
};

const Explore: React.FC<{ multiColumn: boolean }> = ({ multiColumn }) => {
  const { signedIn } = useIdentity();
  const intl = useIntl();
  const columnRef = useRef<ColumnRef>(null);
  const logoRequired = useBreakpoint('full');
  const location = useLocation();

  const countySlug = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get('county');
    return slug?.trim() ?? null;
  }, [location.search]);

  const countyLabel = useMemo(() => toCountyLabel(countySlug), [countySlug]);

  const handleHeaderClick = useCallback(() => {
    columnRef.current?.scrollTop();
  }, []);

  return (
    <Column
      bindToDocument={!multiColumn}
      ref={columnRef}
      label={intl.formatMessage(messages.title)}
    >
      <ColumnHeader
        icon={'explore'}
        iconComponent={logoRequired ? SymbolLogo : TrendingUpIcon}
        title={intl.formatMessage(messages.title)}
        onClick={handleHeaderClick}
        multiColumn={multiColumn}
      />

      <div className='explore__search-header'>
        <Search singleColumn />
      </div>

      {countyLabel && (
        <div className='explore__county-banner'>
          <div className='explore__county-banner__copy'>
            <FormattedMessage
              {...messages.countyBanner}
              values={{ county: countyLabel }}
            />
          </div>
          <Link className='explore__county-banner__action' to='/explore'>
            {intl.formatMessage(messages.countyBannerAction)}
          </Link>
        </div>
      )}

      <div className='account__section-headline'>
        <NavLink exact to='/explore'>
          <FormattedMessage
            tagName='div'
            id='explore.trending_statuses'
            defaultMessage='Posts'
          />
        </NavLink>

        <NavLink exact to='/explore/tags'>
          <FormattedMessage
            tagName='div'
            id='explore.trending_tags'
            defaultMessage='Hashtags'
          />
        </NavLink>

        {signedIn && (
          <NavLink exact to='/explore/suggestions'>
            <FormattedMessage
              tagName='div'
              id='explore.suggested_follows'
              defaultMessage='People'
            />
          </NavLink>
        )}

        <NavLink exact to='/explore/links'>
          <FormattedMessage
            tagName='div'
            id='explore.trending_links'
            defaultMessage='News'
          />
        </NavLink>
      </div>

      <Switch>
        <Route path='/explore/tags' component={Tags} />
        <Route path='/explore/links' component={Links} />
        <Route path='/explore/suggestions' component={Suggestions} />
        <Route exact path={['/explore', '/explore/posts']}>
          <Statuses
            multiColumn={multiColumn}
            countyFilter={countySlug}
            countyLabel={countyLabel}
          />
        </Route>
      </Switch>

      <Helmet>
        <title>{intl.formatMessage(messages.title)}</title>
        <meta name='robots' content='all' />
      </Helmet>
    </Column>
  );
};

// eslint-disable-next-line import/no-default-export
export default Explore;
