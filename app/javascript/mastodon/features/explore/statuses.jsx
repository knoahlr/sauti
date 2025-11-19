import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { defineMessages, FormattedMessage } from 'react-intl';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { debounce } from 'lodash';


import { fetchTrendingStatuses, expandTrendingStatuses } from 'mastodon/actions/trends';
import StatusList from 'mastodon/components/status_list';
import { getStatusList } from 'mastodon/selectors';

const messages = defineMessages({
  countyFilterActive: {
    id: 'explore.county_filter.active',
    defaultMessage: 'Focused on {county}',
  },
});

const mapStateToProps = state => ({
  statusIds: getStatusList(state, 'trending'),
  isLoading: state.getIn(['status_lists', 'trending', 'isLoading'], true),
  hasMore: !!state.getIn(['status_lists', 'trending', 'next']),
});

class Statuses extends PureComponent {

  static propTypes = {
    statusIds: ImmutablePropTypes.list,
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    multiColumn: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    countyFilter: PropTypes.string,
    countyLabel: PropTypes.string,
  };

  componentDidMount () {
    this.loadTrending(true);
  }

  componentDidUpdate (prevProps) {
    const prevCounty = prevProps.countyFilter || null;
    const nextCounty = this.props.countyFilter || null;

    if (prevCounty !== nextCounty) {
      this.loadTrending(true);
    }
  }

  loadTrending = (force = false) => {
    const { dispatch, statusIds, countyFilter } = this.props;

    if (!force && statusIds && statusIds.size > 0) {
      return;
    }

    dispatch(fetchTrendingStatuses({ county: countyFilter || undefined, force }));
  };

  handleLoadMore = debounce(() => {
    const { dispatch } = this.props;
    dispatch(expandTrendingStatuses());
  }, 300, { leading: true });

  render () {
    const { isLoading, hasMore, statusIds, multiColumn, countyLabel } = this.props;

    const emptyMessage = <FormattedMessage id='empty_column.explore_statuses' defaultMessage='Nothing is trending right now. Check back later!' />;

    return (
      <>
        {countyLabel && (
          <div className='explore__county-subhead'>
            <FormattedMessage {...messages.countyFilterActive} values={{ county: countyLabel }} />
          </div>
        )}
        <StatusList
          trackScroll
          alwaysPrepend
          timelineId='explore'
          statusIds={statusIds}
          scrollKey='explore-statuses'
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={this.handleLoadMore}
          emptyMessage={emptyMessage}
          bindToDocument={!multiColumn}
          withCounters
        />
      </>
    );
  }

}

export default connect(mapStateToProps)(Statuses);
