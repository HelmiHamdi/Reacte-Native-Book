import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";
import { API_URL } from "../constants/api";
import styles from "../assets/styles/editProfileModal.styles";
import COLORS from "../constants/colors";
import CustomAlert from "./CustomAlert";

export default function EditProfileModal({ visible, onClose, user }) {
  const { token, setUser } = useAuthStore();
   
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    if (field === "phone") {
      if (/^\d*$/.test(value) && value.length <= 8) {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date) => {
    const formattedDate = date.toLocaleDateString("en-GB");
    setFormData((prev) => ({ ...prev, dateOfBirth: formattedDate }));
    hideDatePicker();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim() || formData.phone.length !== 8)
      newErrors.phone = "Phone must be 8 digits";
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!token) return;
    if (!validateForm()) return;

    setShowConfirm(true); // Affiche le CustomAlert pour confirmation
  };

  const confirmSave = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");
      setUser(data.user);
      onClose();
    } catch (error) {
      console.log("Update error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Edit Profile</Text>

          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(value) => handleChange("username", value)}
                placeholder="Username"
                placeholderTextColor="#888"
                editable={!loading}
              />
            </View>
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
                editable={!loading}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => handleChange("phone", value)}
                placeholder="Phone number"
                keyboardType="phone-pad"
                maxLength={8}
                placeholderTextColor="#888"
                editable={!loading}
              />
            </View>
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Date of Birth */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.dateOfBirth}
                  placeholder="Date of birth"
                  placeholderTextColor="#888"
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
          </View>

          {/* Buttons sur le même niveau */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { flex: 1, marginRight: 10 }]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton, { flex: 1 }]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        {/* CustomAlert pour confirmation */}
        <CustomAlert
          visible={showConfirm}
          type="confirm"
          title="Confirm Update"
          message="Are you sure you want to save the changes?"
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmSave}
          confirmLabel="Save"
          cancelLabel="Cancel"
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}
