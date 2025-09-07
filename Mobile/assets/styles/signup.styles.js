// styles/signup.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  formContainer: { marginBottom: 16 },
  inputGroup: { marginBottom: 20 },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  eyeIcon: { padding: 8 },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.textSecondary,
    marginRight: 5,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  errorContainer: {
  position: "absolute",
  top: "40%",
  left: "10%",
  right: "10%",
  backgroundColor: "#ff4d4f",
  padding: 15,
  borderRadius: 10,
  alignItems: "center",
  zIndex: 1000,
},

 errorText: {
    color: "#ff4d4f", // rouge
    fontSize: 12,
    marginLeft:40,
    marginTop: 5,
  },
  successText: {
    color: "#4BB543", // vert
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#4BB543",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
  },
alertContainer: {
  position: "absolute",
  top: "40%",
  left: "10%",
  right: "10%",
  flexDirection: "row",
  alignItems: "center",
  padding: 15,
  borderRadius: 10,
  zIndex: 1000,
  justifyContent: "center",
  elevation: 10,
},

alertText: {
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 16,
},

});

export default styles;