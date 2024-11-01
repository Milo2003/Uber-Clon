import CustomButton from '@/components/CustomButton';
import DriverCard from '@/components/DiverCard';
import RideLayout from '@/components/RideLayout';
import { useDriverStore } from '@/store';
import { router } from 'expo-router';
import { View, FlatList } from 'react-native';

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  return (
    <RideLayout title="Choose a Driver" snapPoints={['85%']}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id)!)}
          />
        )}
        ListFooterComponent={() => (
          <View className=" mx-5 mt-10 ">
            <CustomButton
              title="Confirm"
              onPress={() => router.push('/(root)/book-ride')}
              className="mt-5"
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
