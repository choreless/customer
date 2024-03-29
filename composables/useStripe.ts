import { loadStripe, type StripeConstructorOptions } from "@stripe/stripe-js";

export default function (options?: StripeConstructorOptions) {
  const STRIPE_PUBLISHABLE_KEY =
    useRuntimeConfig().public.base.STRIPE_PUBLISHABLE_KEY ?? "";
  return loadStripe(STRIPE_PUBLISHABLE_KEY, options);
}
