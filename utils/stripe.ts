import { initStripe } from "@stripe/stripe-react-native";

const publishableKey =
  "pk_test_51JWBA2A6s2DO1RqZzPpTXOJDemJt1H0actm2GeNSeSjmdwDvnzlbGlYbGBePyZBDxJBeaoXmIGQO7A0LjUi1XyFQ006SPyjqDO";
export const stripe = initStripe({ publishableKey });
