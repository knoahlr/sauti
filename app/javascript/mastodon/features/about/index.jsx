import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import { Helmet } from 'react-helmet';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { fetchServer, fetchExtendedDescription, fetchDomainBlocks  } from 'mastodon/actions/server';
import { Account } from 'mastodon/components/account';
import Column from 'mastodon/components/column';
import { ServerHeroImage } from 'mastodon/components/server_hero_image';
import { Skeleton } from 'mastodon/components/skeleton';
import { LinkFooter} from 'mastodon/features/ui/components/link_footer';

import { Section } from './components/section';
import { RulesSection } from './components/rules';

const messages = defineMessages({
  title: { id: 'column.about', defaultMessage: 'About' },
  blocks: { id: 'about.blocks', defaultMessage: 'Moderated servers' },
  silenced: { id: 'about.domain_blocks.silenced.title', defaultMessage: 'Limited' },
  silencedExplanation: { id: 'about.domain_blocks.silenced.explanation', defaultMessage: 'You will generally not see profiles and content from this server, unless you explicitly look it up or opt into it by following.' },
  suspended: { id: 'about.domain_blocks.suspended.title', defaultMessage: 'Suspended' },
  suspendedExplanation: { id: 'about.domain_blocks.suspended.explanation', defaultMessage: 'No data from this server will be processed, stored or exchanged, making any interaction or communication with users from this server impossible.' },
  heroTagline: { id: 'about.hero.tagline', defaultMessage: 'Advancing democratic principles for Kenyan youth' },
  heroTitle: { id: 'about.hero.title', defaultMessage: 'Your voice matters here' },
  heroSubtitle: { id: 'about.hero.subtitle', defaultMessage: 'Join thousands of young Kenyans shaping our democratic future through civic rooms, advisory polls, and community moderation.' },
  heroCtaJoin: { id: 'about.hero.cta.join', defaultMessage: 'Join Sauti' },
  heroCtaExplore: { id: 'about.hero.cta.explore', defaultMessage: 'Explore civic conversations' },
  statsCounties: { id: 'about.hero.stats.counties', defaultMessage: 'Counties represented' },
  statsPositions: { id: 'about.hero.stats.positions', defaultMessage: 'Leadership positions' },
  statsSupport: { id: 'about.hero.stats.support', defaultMessage: 'Support availability' },
  featuresHeading: { id: 'about.features.heading', defaultMessage: 'Built for meaningful participation' },
  featuresCopy: { id: 'about.features.copy', defaultMessage: 'Sauti provides secure, transparent spaces where young people can collaborate, deliberate, and guide democratic action.' },
  featureRoomsTitle: { id: 'about.features.rooms.title', defaultMessage: 'Unified civic rooms' },
  featureRoomsCopy: { id: 'about.features.rooms.copy', defaultMessage: 'Discuss county, constituency, and ward priorities with real-time updates and persistent context.' },
  featurePollsTitle: { id: 'about.features.polls.title', defaultMessage: 'Advisory polling' },
  featurePollsCopy: { id: 'about.features.polls.copy', defaultMessage: 'Launch transparent polls, share verifiable outcomes, and feed insights back to your community.' },
  featureModerationTitle: { id: 'about.features.moderation.title', defaultMessage: 'Community-led moderation' },
  featureModerationCopy: { id: 'about.features.moderation.copy', defaultMessage: 'Empower trusted youth leaders with reporting, escalation, and safety tooling that keeps dialogue healthy.' },
  featureSecurityTitle: { id: 'about.features.security.title', defaultMessage: 'Secure identity' },
  featureSecurityCopy: { id: 'about.features.security.copy', defaultMessage: 'National ID verification and multi-factor authentication keep participation accountable while protecting privacy.' },
  featureAccessTitle: { id: 'about.features.access.title', defaultMessage: 'Accessible everywhere' },
  featureAccessCopy: { id: 'about.features.access.copy', defaultMessage: 'Optimized for low-bandwidth devices with English and Swahili content on the roadmap.' },
});

const severityMessages = {
  silence: {
    title: messages.silenced,
    explanation: messages.silencedExplanation,
  },

  suspend: {
    title: messages.suspended,
    explanation: messages.suspendedExplanation,
  },
};

const mapStateToProps = state => ({
  server: state.getIn(['server', 'server']),
  locale: state.getIn(['meta', 'locale']),
  extendedDescription: state.getIn(['server', 'extendedDescription']),
  domainBlocks: state.getIn(['server', 'domainBlocks']),
});

class About extends PureComponent {

  static propTypes = {
    server: ImmutablePropTypes.map,
    locale: ImmutablePropTypes.string,
    extendedDescription: ImmutablePropTypes.map,
    domainBlocks: ImmutablePropTypes.contains({
      isLoading: PropTypes.bool,
      isAvailable: PropTypes.bool,
      items: ImmutablePropTypes.list,
    }),
    dispatch: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    multiColumn: PropTypes.bool,
  };

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(fetchServer());
    dispatch(fetchExtendedDescription());
  }

  handleDomainBlocksOpen = () => {
    const { dispatch } = this.props;
    dispatch(fetchDomainBlocks());
  };

  render () {
    const { multiColumn, intl, server, extendedDescription, domainBlocks, locale } = this.props;
    const isLoading = server.get('isLoading');
    const stats = [
      { value: '47', label: intl.formatMessage(messages.statsCounties) },
      { value: '6', label: intl.formatMessage(messages.statsPositions) },
      { value: '24/7', label: intl.formatMessage(messages.statsSupport) },
    ];

    const features = [
      { title: intl.formatMessage(messages.featureRoomsTitle), description: intl.formatMessage(messages.featureRoomsCopy) },
      { title: intl.formatMessage(messages.featurePollsTitle), description: intl.formatMessage(messages.featurePollsCopy) },
      { title: intl.formatMessage(messages.featureModerationTitle), description: intl.formatMessage(messages.featureModerationCopy) },
      { title: intl.formatMessage(messages.featureSecurityTitle), description: intl.formatMessage(messages.featureSecurityCopy) },
      { title: intl.formatMessage(messages.featureAccessTitle), description: intl.formatMessage(messages.featureAccessCopy) },
    ];

    return (
      <Column bindToDocument={!multiColumn} label={intl.formatMessage(messages.title)}>
        <div className='scrollable about about--sauti'>
          <div className='about-sauti'>
            <div className='about-sauti__hero'>
              <div className='about-sauti__hero__content'>
                <span className='about-sauti__pill'><FormattedMessage {...messages.heroTagline} /></span>
                <h1 className='about-sauti__hero-title'>
                  <FormattedMessage {...messages.heroTitle} />
                </h1>
                <p className='about-sauti__hero-subtitle'>
                  <FormattedMessage {...messages.heroSubtitle} />
                </p>
                <div className='about-sauti__hero-actions'>
                  <a className='about-sauti__cta about-sauti__cta--primary' href='/auth/sign_up'>
                    <FormattedMessage {...messages.heroCtaJoin} />
                  </a>
                  <a className='about-sauti__cta about-sauti__cta--secondary' href='/explore'>
                    <FormattedMessage {...messages.heroCtaExplore} />
                  </a>
                </div>
                <div className='about-sauti__stats'>
                  {stats.map(stat => (
                    <div className='about-sauti__stat' key={stat.label}>
                      <span className='about-sauti__stat-value'>{stat.value}</span>
                      <span className='about-sauti__stat-label'>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='about-sauti__hero__media'>
                <ServerHeroImage blurhash={server.getIn(['thumbnail', 'blurhash'])} src={server.getIn(['thumbnail', 'url'])} srcSet={server.getIn(['thumbnail', 'versions'])?.map((value, key) => `${value} ${key.replace('@', '')}`).join(', ')} className='about-sauti__hero-image' />
              </div>
            </div>

            <div className='about-sauti__features'>
              <div className='about-sauti__features-header'>
                <h2><FormattedMessage {...messages.featuresHeading} /></h2>
                <p><FormattedMessage {...messages.featuresCopy} /></p>
              </div>
              <div className='about-sauti__features-grid'>
                {features.map(feature => (
                  <div className='about-sauti__feature-card' key={feature.title}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='about__meta about-sauti__meta'>
              <div className='about__meta__column'>
                <h4><FormattedMessage id='server_banner.administered_by' defaultMessage='Administered by:' /></h4>

                <Account id={server.getIn(['contact', 'account', 'id'])} size={36} minimal />
              </div>

              <hr className='about__meta__divider' />

              <div className='about__meta__column'>
                <h4><FormattedMessage id='about.contact' defaultMessage='Contact:' /></h4>

                {isLoading ? <Skeleton width='10ch' /> : <a className='about__mail' href={`mailto:${server.getIn(['contact', 'email'])}`}>{server.getIn(['contact', 'email'])}</a>}
              </div>
            </div>
          </div>

          <div className='about-sauti__details'>
            <Section open title={intl.formatMessage(messages.title)}>
              {extendedDescription.get('isLoading') ? (
                <>
                  <Skeleton width='100%' />
                <br />
                <Skeleton width='100%' />
                <br />
                <Skeleton width='100%' />
                <br />
                <Skeleton width='70%' />
              </>
            ) : (extendedDescription.get('content')?.length > 0 ? (
              <div
                className='prose'
                dangerouslySetInnerHTML={{ __html: extendedDescription.get('content') }}
              />
            ) : (
              <p><FormattedMessage id='about.not_available' defaultMessage='This information has not been made available on this server.' /></p>
            ))}
            </Section>

            <RulesSection />

            <Section title={intl.formatMessage(messages.blocks)} onOpen={this.handleDomainBlocksOpen}>
              {domainBlocks.get('isLoading') ? (
                <>
                  <Skeleton width='100%' />
                <br />
                <Skeleton width='70%' />
              </>
            ) : (domainBlocks.get('isAvailable') ? (
              <>
                <p><FormattedMessage id='about.domain_blocks.preamble' defaultMessage='Mastodon generally allows you to view content from and interact with users from any other server in the fediverse. These are the exceptions that have been made on this particular server.' /></p>

                {domainBlocks.get('items').size > 0 && (
                  <div className='about__domain-blocks'>
                    {domainBlocks.get('items').map(block => (
                      <div className='about__domain-blocks__domain' key={block.get('domain')}>
                        <div className='about__domain-blocks__domain__header'>
                          <h6><span title={`SHA-256: ${block.get('digest')}`}>{block.get('domain')}</span></h6>
                          <span className='about__domain-blocks__domain__type' title={intl.formatMessage(severityMessages[block.get('severity')].explanation)}>{intl.formatMessage(severityMessages[block.get('severity')].title)}</span>
                        </div>

                        <p>{(block.get('comment') || '').length > 0 ? block.get('comment') : <FormattedMessage id='about.domain_blocks.no_reason_available' defaultMessage='Reason not available' />}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
              ) : (
                <p><FormattedMessage id='about.not_available' defaultMessage='This information has not been made available on this server.' /></p>
              ))}
            </Section>
          </div>

          <LinkFooter />

          <div className='about__footer'>
            <p><FormattedMessage id='about.disclaimer' defaultMessage='Mastodon is free, open-source software, and a trademark of Mastodon gGmbH.' /></p>
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

export default connect(mapStateToProps)(injectIntl(About));
