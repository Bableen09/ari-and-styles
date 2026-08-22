/**
 * Newsletter Service Abstraction Layer
 * Handles newsletter subscriptions.
 * Ready for Mailchimp, Brevo, Klaviyo, or Resend webhook integration.
 */

const SUBSCRIBERS_KEY = 'ari_styles_newsletter_subscribers';

export const newsletterService = {
  async subscribe(email) {
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      const existing = JSON.parse(localStorage.getItem(SUBSCRIBERS_KEY) || '[]');
      if (!existing.includes(email.toLowerCase())) {
        existing.push(email.toLowerCase());
        localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(existing));
      }
    } catch (e) {
      console.warn('Failed to save email subscription', e);
    }

    return {
      success: true,
      message: "You're now part of the Ari & Styles community.",
    };
  },
};

export default newsletterService;
