// components/EditProfileModal.jsx
import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";
import { useAuthStore } from "../store/authStore";
import { API_URL } from "../constants/api";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileModal({ visible, onClose }) {
  const { user, setUser, token } = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);

  // Réinitialiser le formulaire quand on ouvre le modal
  useEffect(() => {
    if (visible && user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      });
    }
  }, [visible, user]);

  const handleChange = (name, value) => setForm((s) => ({ ...s, [name]: value }));

  const validateClient = (payload) => {
    if (payload.username !== undefined && payload.username.trim().length > 0) {
      if (payload.username.trim().length < 3) return "Username must be at least 3 characters";
    }
    if (payload.email !== undefined) {
      const e = payload.email.trim();
      if (e.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e)) return "Please enter a valid email";
      }
    }
    if (payload.phone !== undefined) {
      const p = payload.phone.trim();
      if (p.length > 0 && !/^\d{8}$/.test(p)) return "Phone must be 8 digits";
    }
    if (payload.dateOfBirth !== undefined) {
      const d = payload.dateOfBirth;
      if (d && isNaN(new Date(d).getTime())) return "Invalid date of birth";
    }
    return null;
  };

  const handleSave = async () => {
    if (!token) return Alert.alert("Erreur", "User token missing. Please login again.");

    // Construire payload seulement avec champs modifiés (trim + comparer)
    const payload = {};
    const trim = (s) => (typeof s === "string" ? s.trim() : s);

    // username
    if (trim(form.username) !== (user.username || "")) payload.username = trim(form.username);

    // email
    const currentEmail = (user.email || "").toLowerCase();
    if (trim(form.email).toLowerCase() !== currentEmail) payload.email = trim(form.email).toLowerCase();

    // phone
    if (trim(form.phone) !== (user.phone || "")) payload.phone = trim(form.phone);

    // dateOfBirth
    const currentDob = user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "";
    if ((form.dateOfBirth || "") !== currentDob) {
      if (form.dateOfBirth) payload.dateOfBirth = form.dateOfBirth;
      else payload.dateOfBirth = null; // si tu veux permettre suppression ; sinon ignore
    }

    if (Object.keys(payload).length === 0) {
      return Alert.alert("Aucune modification", "Vous n'avez rien modifié.");
    }

    // validation client
    const clientErr = validateClient(payload);
    if (clientErr) return Alert.alert("Validation", clientErr);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      // Mettre à jour le store utilisateur
      if (data.user) setUser(data.user);

      Alert.alert("Succès", data.message || "Profile updated");
      onClose();
    } catch (error) {
      Alert.alert("Erreur", error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Edit Profile ✏️</Text>

          {[
            { key: "username", icon: "person-outline", placeholder: "Username" },
            { key: "email", icon: "mail-outline", placeholder: "Email" },
            { key: "phone", icon: "call-outline", placeholder: "Phone" },
            { key: "dateOfBirth", icon: "calendar-outline", placeholder: "Date of Birth (YYYY-MM-DD)" },
          ].map(({ key, icon, placeholder }) => (
            <View key={key} style={styles.inputWrapper}>
              <Ionicons name={icon} size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <TextInput
                placeholder={placeholder}
                value={form[key]}
                onChangeText={(text) => handleChange(key, text)}
                style={styles.inputField}
                placeholderTextColor={COLORS.textSecondary}
                keyboardType={key === "phone" ? "numeric" : "default"}
              />
            </View>
          ))}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Save</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
