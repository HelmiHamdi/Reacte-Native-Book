import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator 
} from "react-native";
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, register } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [errors, setErrors] = useState({}); // erreurs par champ
 

  const router = useRouter();

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString("en-GB");
    setDateOfBirth(formattedDate);
    hideDatePicker();
  };

  // Validation étape 1
  const handleNextStep = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required!";
    if (!phone.trim()) newErrors.phone = "Phone number is required!";
    if (!dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth is required!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) setStep(2);
  };

  // Validation et inscription
  const handleSignUp = async () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required!";
    if (!password.trim()) newErrors.password = "Password is required!";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const result = await register(username, phone, dateOfBirth, email, password);

    if (!result.success) {
      // Backend errors par champ
      setErrors(result.errors || { general: "Registration failed" });
      return;
    }

    setErrors({});
  
    setUsername(""); setPhone(""); setDateOfBirth(""); setEmail(""); setPassword("");
    setStep(1);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>📚 InspireRead 📚</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>

          {/* FORM */}
          <View style={styles.formContainer}>
            {step === 1 ? (
              <>
                {/* Username */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your username"
                      value={username}
                      onChangeText={setUsername}
                    />
                  </View>
                  {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                </View>

                {/* Phone */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="call-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      maxLength={8}
                    />
                  </View>
                  {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                </View>

                {/* Date of Birth */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={showDatePicker}>
                      <Ionicons name="calendar-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.input}
                      placeholder="Select your date of birth"
                      value={dateOfBirth}
                      editable={false}
                    />
                  </View>
                  {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Email */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                {/* Password */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                      <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.scondary, marginTop: 10 }]} onPress={() => setStep(1)}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                  {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                </TouchableOpacity>

                {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
              
              </>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
