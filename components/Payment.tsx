import { useState } from 'react';
import CustomButton from './CustomButton';
import { useStripe } from '@stripe/stripe-react-native';
import { Alert, Image, Text, View } from 'react-native';
import { fetchAPI } from '@/lib/fetch';
import { PaymentProps } from '@/types/type';
import { useLocationStore } from '@/store';
import { useAuth, useUser } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { icons } from '@/constants';
import { router } from 'expo-router';

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { userId } = useAuth();
  const [success, setSuccess] = useState(false);
  const {
    userAddress,
    userLatitude,
    userLongitude,
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  // const [loading, setLoading] = useState(false);

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example Inc.',
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: 'usd',
        },
        confirmHandler: async ({
          paymentMethod,
          intentCreationCallBack,
        }: any) => {
          const { paymentIntent, customer } = await fetchAPI(
            '(api)/(stripe)/create+api',
            {
              method: 'POST',
              body: JSON.stringify({
                name: fullName || email.split('@')[0],
                email,
                amount,
                paymentMethodId: paymentMethod.id,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          if (paymentIntent.client_secret) {
            const { result } = await fetchAPI('(api)/(stripe)/pay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                customer_id: customer,
              }),
            });

            if (result.client_secret) {
              await fetchAPI('(api)/ride/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  origin_address: userAddress,
                  destination_address: destinationAddress,
                  origin_latitude: userLatitude,
                  origin_longitude: userLongitude,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: parseInt(amount),
                  payment_status: 'paid',
                  driver_id: driverId,
                  user_id: userId,
                }),
              });

              intentCreationCallBack({ clientSecret: result.client_secret });
            }
          }
        },
      },
      returnURL: 'myapp"//book-ride',
    });
    if (!error) {
      return Response.json({ success: true });
    }
  };
  return (
    <>
      <CustomButton
        title="Confirm Ride"
        onPress={openPaymentSheet}
        className="my-10"
      />
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className=" flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={icons.checkmark} className="w-28 h-28 mt-5" />
          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Ride booked!{' '}
          </Text>
          <Text className="text-md text-general-200 text-center font-JakartaMedium mt-3">
            Thank you for your booking. Your reservation has been placed. Please
            proceed with your trip!{' '}
          </Text>
          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push('/(root)/(tabs)/home');
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
