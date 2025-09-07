import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      {/* Avatar centré au-dessus */}
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

      {/* Infos alignées en grille */}
      <View style={styles.profileInfoGrid}>
        {/* Username */}
        <View style={styles.infoBox}>
          <Ionicons name="person-circle-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.username}>{user.username}</Text>
        </View>

        {/* Email */}
        <View style={styles.infoBox}>
          <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Phone */}
        {user.phone && (
          <View style={styles.infoBox}>
            <Ionicons name="call-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.email}>{user.phone}</Text>
          </View>
        )}

        {/* Date of Birth */}
        {user.dateOfBirth && (
          <View style={styles.infoBox}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.email}>{user.dateOfBirth}</Text>
          </View>
        )}
       
      </View>
    </View>
  );
}
