# frozen_string_literal: true

class LandingController < ApplicationController
  layout 'landing'
  skip_before_action :require_functional!

  # Disable CSP nonce for development compatibility with Vite HMR
  after_action :disable_csp_nonce

  def show
    # Standalone landing page - no authentication required
    expires_in(15.seconds, public: true, stale_while_revalidate: 30.seconds, stale_if_error: 1.day)
  end

  private

  def disable_csp_nonce
    request.content_security_policy_nonce_generator = nil
  end
end
