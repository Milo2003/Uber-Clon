import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import { fetchAPI } from './fetch';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, SignUp, setActivate } = await startOAuthFlow({
      redirectURL: Linking.createURL('/(root)/(tabs)/home', {
        scheme: 'myapp',
      }),
    });

    if (createdSessionId) {
      if (setActivate) {
        await setActivate({ session: createdSessionId });
        if (SignUp.createdUserId) {
          await fetchAPI('(api)/user', {
            method: 'POST',
            body: JSON.stringify({
              id: SignUp.createdUserId,
              email: SignUp.email,
              name: `${SignUp.firstName} ${SignUp.lastName}`,
            }),
          });
        }
        return {
          success: true,
          code: 'success',
          message: 'You have successfully authenticated',
        };
      }
    }
    return { success: false, code: 'success', message: 'An error ocurred' };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      code: error.code,
      message: error?.errors[0]?.longMessage,
    };
  }
};