import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useRef, useState } from 'react';
import { onboarding } from '@/constants/index';
import CustomButton from '@/components/CustomButton';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activateIndex, setActivateIndex] = useState(0);
  const isLastSlide = activateIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        className="w-full flex justify-between items-end p-5"
        onPress={() => {
          router.replace('/(auth)/sign-up');
        }}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] bg-[#E2E8F0] rounded-full mx-1" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] bg-[#0286FF] rounded-full mx-1" />
        }
        onIndexChanged={(index) => setActivateIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-[#858585] text-lg font-JakartaRegular text-center mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() =>
          isLastSlide
            ? router.replace('/(auth)/sign-up')
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default Welcome;
