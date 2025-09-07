import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,
  register: async (username, phone, dateOfBirth, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          phone,
          dateOfBirth,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("📥 Response from API:", data);

      if (!response.ok) throw new Error(data.message || "Registration failed");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error) {
      console.error("❌error:", error.message);
      set({ isLoading: false });
      return {
        success: false,
        error: error.message, // <-- correction ici
      };
    }
  },

    login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
        const data = await response.json();
        console.log("📥 Response from API:", data)
        if (!response.ok) throw new Error(data.message || "Login failed");
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);
        set({ user: data.user, token: data.token, isLoading: false });
        return { success: true };
    } catch (error) {

      set({ isLoading: false });
        return {
        success: false,
        error: error.message,
      };
    }
    }, 
  checkAuth: async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const userJson = await AsyncStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;
        set({ user, token });
    } catch (error) {
        console.error("Error checking auth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      set({ user: null, token: null });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
        
}));
