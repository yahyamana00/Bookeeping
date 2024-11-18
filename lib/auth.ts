import { account } from './appwrite';
import { ID } from 'appwrite';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    return await account.createEmailSession(email, password);
  } catch (error) {
    throw error;
  }
};

export const loginWithPhone = async (phone: string, password: string) => {
  try {
    return await account.createPhoneSession(phone, password);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};