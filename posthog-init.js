(() => {
  const projectToken = window.POSTHOG_PROJECT_TOKEN;
  const host = window.POSTHOG_HOST;
  const isDevelopment =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (!projectToken) {
    if (isDevelopment) {
      throw new Error(
        'POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once POSTHOG_PROJECT_TOKEN is configured'
      );
    }
    return;
  }

  if (!host) {
    if (isDevelopment) {
      throw new Error(
        'POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once POSTHOG_HOST is configured'
      );
    }
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `${host}/static/array.js`;
  script.onload = () => {
    window.posthog.init(projectToken, {
      api_host: host,
      logs: {
        serviceName: 'posthog-test-page',
      },
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: false,
      },
    });
    window.posthog.logger?.info('welcome page initialized', {
      page: 'welcome',
    });
  };
  document.head.appendChild(script);
})();
