<h3 align="center">Full Stack Uber Clone</h3>

## Acknowledgments

This project was created thanks to the guidance and resources provided by [JavaScript Mastery](https://www.javascriptmastery.pro). Thank you for the inspiration and invaluable knowledge!

## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native
- Expo
- Stripe
- PostgreSQL
- Google Maps
- Zustand
- Clerk
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Onboarding Flow**: Seamless user registration and setup process.

👉 **Email Password Authentication with Verification**: Secure login with email verification.

👉 **oAuth Using Google**: Easy login using Google credentials.

👉 **Authorization**: Secure access control for different user roles.

👉 **Home Screen with Live Location & Google Map**: Real-time location tracking with markers on a map.

👉 **Recent Rides**: View a list of recent rides at a glance.

👉 **Google Places Autocomplete**: Search any place on Earth with autocomplete suggestions.

👉 **Find Rides**: Search for rides by entering 'From' and 'To' locations.

👉 **Select Rides from Map**: Choose available cars near your location from the map.

👉 **Confirm Ride with Detailed Information**: View complete ride details, including time and fare price.

👉 **Pay for Ride Using Stripe**: Make payments using multiple methods like cards and others.

👉 **Create Rides After Successful Payment**: Book a ride after confirming payment.

👉 **Profile**: Manage account details in the profile screen.

👉 **History**: Review all rides booked so far.

👉 **Responsive on Android and iOS**: Optimized for both Android and iOS devices.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/JavaScript-Mastery-Pro/uber.git
cd uber
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env

EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
DATABASE_URL=
EXPO_PUBLIC_SERVER_URL=
GEOAPIFY_API_KEY=
GOOGLE_API_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

```

Replace the placeholder values with your actual Clerk, Stripe, NeonDB, Google Maps, andgeoapify credentials. You can
obtain these credentials by signing up on
the [Clerk](https://clerk.com/), [Stripe](https://stripe.com/in), [NeonDB](https://neon.tech/), [Google Maps](https://console.cloud.google.com/)
and [geoapify](https://www.geoapify.com/) websites respectively.

**Running the Project**

```bash
npx expo start
```

Download the [Expo Go](https://expo.dev/go) app and Scan the QR code on your respective device to view the project.
