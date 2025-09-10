// screens/ForgotPassword.jsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import styles from "../../assets/styles/forgot.styles.js"; // on réutilise le même style que signup
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import CustomAlert from "../../components/CustomAlert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState(1); // 1=send OTP, 2=reset password
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { forgotPasswordApi, resetPasswordApi } = useAuthStore();
  const router = useRouter();

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleSendOtp = async () => {
    if (!email.trim()) return setErrors({ email: "Email is required" });
    setLoading(true);
    const res = await forgotPasswordApi(email);
    setLoading(false);
    if (res.success) {
      setStep(2);
      showAlert("success", "OTP sent to your email!");
    } else {
      showAlert("error", res.error || "Failed to send OTP");
    }
  };

  const handleResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim())
      return setErrors({ general: "OTP and new password are required" });

    setLoading(true);
    const res = await resetPasswordApi(email, otp, newPassword);
    setLoading(false);

    if (res.success) {
      showAlert("success", "Password reset successfully!");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setErrors({});
      router.push("/(auth)/index");
    } else {
      showAlert("error", res.error || "Password reset failed");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {step === 1 ? "🔑 Forgot Password" : "🔒 Reset Password"}
            </Text>
            <Text style={styles.subtitle}>
              {step === 1
                ? "Reset your account access"
                : "Enter OTP and new password"}
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.formContainer}>
            {step === 1 ? (
              <>
                {/* Email */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* OTP */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>OTP</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="key-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter OTP"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* New Password */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>New Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {errors.general && (
                  <Text style={styles.errorText}>{errors.general}</Text>
                )}

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Reset Password</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        type={alertType}
        title={alertType === "success" ? "Success" : "Error"}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}
