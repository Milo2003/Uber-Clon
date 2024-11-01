import CustomButton from '@/components/CustomButton';
import GoogleTextInput from '@/components/GoogleTextInput';
import RideLayout from '@/components/RideLayout';
import { icons } from '@/constants';
import { useLocationStore } from '@/store';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

const findRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Ride" snapPoints={['85%']}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.search}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      <CustomButton
        title="Find now"
        onPress={() => router.push('/(root)/confirm-ride')}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default findRide;
