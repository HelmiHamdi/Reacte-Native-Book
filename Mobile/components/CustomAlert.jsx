// components/CustomAlert.js
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function CustomAlert({
  visible,
  type,
  title,
  message,
  onClose,
  onConfirm,
  confirmLabel,
  cancelLabel,
}) {
  if (!visible) return null;

  const isSuccess = type === "success";
  const isError = type === "error";
  const isConfirm = type === "confirm";

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.cardBackground,
            width: "80%",
            borderRadius: 16,
            padding: 20,
            alignItems: "center",
            shadowColor: COLORS.black,
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          {/* Icône */}
          <Ionicons
            name={
              isSuccess
                ? "checkmark-circle-outline"
                : isError
                ? "alert-circle-outline"
                : "help-circle-outline"
            }
            size={50}
            color={isSuccess ? "green" : isError ? "red" : COLORS.primary}
            style={{ marginBottom: 12 }}
          />

          {/* Titre */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 8,
              color: COLORS.textPrimary,
            }}
          >
            {title}
          </Text>

          {/* Message */}
          <Text
            style={{
              fontSize: 14,
              color: COLORS.textSecondary,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {message}
          </Text>

          {/* Boutons */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {isConfirm && (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.textColor,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  marginRight: 10,
                }}
                onPress={onClose}
              >
                <Text style={{ color: COLORS.white, fontWeight: "600" }}>
                  {cancelLabel || "Cancel"}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: isError
                  ? "red"
                  : isSuccess
                  ? "green"
                  : COLORS.primary,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={isConfirm ? onConfirm : onClose}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>
                {isConfirm ? confirmLabel || "Delete" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
