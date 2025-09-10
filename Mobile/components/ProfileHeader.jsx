/*import { View, Text } from "react-native";
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
    
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

     
      <View style={styles.profileInfoGrid}>
        
        <View style={styles.infoBox}>
          <Ionicons name="person-circle-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.username}>{user.username}</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.email}>{user.email}</Text>
        </View>

    
        {user.phone && (
          <View style={styles.infoBox}>
            <Ionicons name="call-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.email}>{user.phone}</Text>
          </View>
        )}

     
        {user.dateOfBirth && (
          <View style={styles.infoBox}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.email}>{user.dateOfBirth}</Text>
          </View>
        )}
       
      </View>
    </View>
  );
}*/
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfoGrid}>
        <View style={styles.infoBox}>
          <Ionicons name="person-circle-outline" size={20} color="#666" />
          <Text style={styles.username}>{user.username}</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="mail-outline" size={20} color="#666" />
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="call-outline" size={20} color="#666" />
          <Text style={styles.email}>{user.phone}</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <Text style={styles.email}>{user.dateOfBirth}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editProfileButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="create-outline" size={18} color={COLORS.white} />
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        user={user}
      />
    </View>
  );
}
