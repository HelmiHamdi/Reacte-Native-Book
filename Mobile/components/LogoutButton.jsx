import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { useState } from "react";
import CustomAlert from "./CustomAlert";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const [alertVisible, setAlertVisible] = useState(false);

  // Afficher la confirmation
  const confirmLogout = () => {
    setAlertVisible(true);
  };

  // Confirmer le logout
  const handleLogout = () => {
    setAlertVisible(false);
    logout();
  };

  return (
    <View>
      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Custom Alert avec Yes / No */}
      <CustomAlert
        visible={alertVisible}
        type="confirm"
        title="Logout"
        message="Are you sure you want to logout?"
        onClose={() => setAlertVisible(false)}
        onConfirm={handleLogout}
        cancelLabel="No"
        confirmLabel="Yes"
      />
    </View>
  );
}
