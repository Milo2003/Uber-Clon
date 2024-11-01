import React, { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { router } from 'expo-router';
import { icons } from '@/constants';
import Map from '@/components/Map';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="h-6 w-6"
                  alt="back arrow"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold  ml-5">
              {title || 'Go back'}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ['40%', '85%']}
          index={0}
        >
          {title === 'Choose a Rider' ? (
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
