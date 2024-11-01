import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, amount } = body;
    if (!name || !email || !amount) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid mail', status: 400 }),
      );
    }

    let customer;
    const existingCustomerExist = await stripe.customers.list({ email: email });

    if (existingCustomerExist.data.length > 0) {
      customer = existingCustomerExist.data[0];
    } else {
      const newCustomer = await stripe.customers.create({
        name: name,
        email: email,
      });
      customer = newCustomer;
    }
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-09-30.acacia' },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
    return new Response(
      JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey,
        customer: customer.id,
      }),
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error, status: 400 }));
  }
}
