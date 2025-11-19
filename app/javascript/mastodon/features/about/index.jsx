import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import Column from 'mastodon/components/column';
import { fetchServer } from 'mastodon/actions/server';

import KenyaCountiesMap from './components/kenya_counties_map';

const messages = defineMessages({
  title: { id: 'column.about', defaultMessage: 'About' },
  welcome: { id: 'about.landing.welcome', defaultMessage: 'Select Your County' },
  subtitle: { id: 'about.landing.subtitle', defaultMessage: 'Explore civic conversations and community engagement across Kenya' },
  signupTitle: { id: 'about.landing.signup.title', defaultMessage: 'Join Sauti' },
  signupDescription: { id: 'about.landing.signup.description', defaultMessage: 'Create an account to participate in civic discussions, join county conversations, and make your voice heard.' },
  signupButton: { id: 'about.landing.signup.button', defaultMessage: 'Create Account' },
  signinButton: { id: 'about.landing.signin.button', defaultMessage: 'Sign In' },
  exploreAllButton: { id: 'about.landing.explore.button', defaultMessage: 'Explore All Kenya' },
  mapLoading: { id: 'about.map.loading', defaultMessage: 'Loading county map…' },
  mapInstruction: { id: 'about.map.instruction', defaultMessage: 'Click any county to view civic conversations from that region' },
});

const mapStateToProps = state => ({
  server: state.getIn(['server', 'server']),
});

class About extends PureComponent {

  static propTypes = {
    server: ImmutablePropTypes.map,
    dispatch: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    multiColumn: PropTypes.bool,
  };

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(fetchServer());
  }

  handleCountySelect = countyName => {
    if (!countyName) return;

    const slug = countyName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    // Navigate to explore page with county parameter
    this.props.history.push(`/explore?county=${encodeURIComponent(slug)}`);
  };

  handleExploreAll = () => {
    this.props.history.push('/explore');
  };

  render () {
    const { intl, multiColumn } = this.props;

    return (
      <Column bindToDocument={!multiColumn} label={intl.formatMessage(messages.title)}>
        <div className='scrollable about'>
          <div className='county-landing'>
            <div className='county-landing__header'>
              <h1 className='county-landing__title'>
                <FormattedMessage {...messages.welcome} />
              </h1>
              <p className='county-landing__subtitle'>
                <FormattedMessage {...messages.subtitle} />
              </p>
            </div>

            <div className='county-landing__content'>
              <div className='county-landing__map-section'>
                <div className='county-landing__map-container'>
                  <KenyaCountiesMap
                    selectedCounty={null}
                    onCountySelect={this.handleCountySelect}
                    loadingLabel={intl.formatMessage(messages.mapLoading)}
                  />
                </div>
                <p className='county-landing__map-instruction'>
                  <FormattedMessage {...messages.mapInstruction} />
                </p>
                <div className='county-landing__actions'>
                  <button
                    className='button button--block county-landing__explore-button'
                    onClick={this.handleExploreAll}
                  >
                    <FormattedMessage {...messages.exploreAllButton} />
                  </button>
                </div>
              </div>

              <div className='county-landing__signup-section'>
                <div className='county-landing__signup-card'>
                  <h2 className='county-landing__signup-title'>
                    <FormattedMessage {...messages.signupTitle} />
                  </h2>
                  <p className='county-landing__signup-description'>
                    <FormattedMessage {...messages.signupDescription} />
                  </p>
                  <div className='county-landing__signup-actions'>
                    <a
                      href='/auth/sign_up'
                      className='button button--block button--primary'
                    >
                      <FormattedMessage {...messages.signupButton} />
                    </a>
                    <a
                      href='/auth/sign_in'
                      className='button button--block'
                    >
                      <FormattedMessage {...messages.signinButton} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Helmet>
          <title>{intl.formatMessage(messages.title)}</title>
          <meta name='robots' content='all' />
        </Helmet>
      </Column>
    );
  }

}

export default connect(mapStateToProps)(injectIntl(withRouter(About)));
