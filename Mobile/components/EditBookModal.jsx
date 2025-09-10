// EditBookModal.js
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuthStore } from "../store/authStore";
import { API_URL } from "../constants/api";
import CustomAlert from "./CustomAlert";
import editStyles from "../assets/styles/editStyles";
import COLORS from "../constants/colors";

export default function EditBookModal({ visible, onClose, book, onBookUpdated }) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { token } = useAuthStore();

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setCaption(book.caption || "");
      setRating(book.rating || 3);
      setImage(book.image || null);
      setImageBase64(null);
      setErrors({});
    }
  }, [book, visible]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!caption.trim()) newErrors.caption = "Description is required";
    if (rating < 1 || rating > 5) newErrors.rating = "Rating must be between 1-5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showAlert = (type, title, message) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          showAlert("error", "Permission Denied", "We need camera roll permissions to upload an image");
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
        if (errors.image) setErrors({ ...errors, image: "" });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      showAlert("error", "Error", "There was a problem selecting your image");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      let imageDataUrl = null;
      if (imageBase64) {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
        imageDataUrl = `data:${imageType};base64,${imageBase64}`;
      }

      const response = await fetch(`${API_URL}/books/${book._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl || book.image,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      showAlert("success", "Success 🎉", "Book updated successfully!");
      if (onBookUpdated) {
        onBookUpdated(data);
      }

      setTimeout(() => {
        setAlertVisible(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error updating book:", error);
      showAlert("error", "Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={editStyles.starButton}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={34}
            color={i <= rating ? "#FFD700" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={editStyles.ratingContainer}>{stars}</View>;
  };

  const handleChange = (field, value) => {
    if (field === "title") setTitle(value);
    if (field === "caption") setCaption(value);
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={editStyles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={editStyles.modalCard}>
          {/* HEADER */}
          <View style={editStyles.modalHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book" size={22} color={COLORS.primary} style={{ marginRight: 6 }} />
              <Text style={editStyles.modalTitle}>Edit Book</Text>
              <Ionicons name="book" size={22} color={COLORS.primary} style={{ marginLeft: 50 }} />
            </View>
          
          </View>

          <ScrollView contentContainerStyle={editStyles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* BOOK TITLE */}
            <View style={editStyles.formGroup}>
              <Text style={editStyles.label}>Book Title</Text>
              <View style={[editStyles.inputContainer, errors.title && editStyles.inputError]}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.primary}
                  style={editStyles.inputIcon}
                />
                <TextInput
                  style={editStyles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={(value) => handleChange("title", value)}
                />
              </View>
              {errors.title ? <Text style={editStyles.errorText}>{errors.title}</Text> : null}
            </View>

            {/* RATING */}
            <View style={editStyles.formGroup}>
              <Text style={editStyles.label}>Your Rating</Text>
              {renderRatingPicker()}
              {errors.rating ? <Text style={editStyles.errorText}>{errors.rating}</Text> : null}
            </View>

            {/* IMAGE */}
            <View style={editStyles.formGroup}>
              <Text style={editStyles.label}>Book Image</Text>
              <View style={editStyles.imageWrapper}>
                <TouchableOpacity
                  style={[editStyles.imagePicker, errors.image && editStyles.inputError]}
                  onPress={pickImage}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={editStyles.previewImage} />
                  ) : (
                    <View style={editStyles.placeholderContainer}>
                      <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                      <Text style={editStyles.placeholderText}>Tap to add image</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={editStyles.imageBadge} onPress={pickImage}>
                  <Ionicons name="camera" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              {errors.image ? <Text style={editStyles.errorText}>{errors.image}</Text> : null}
            </View>

            {/* CAPTION */}
            <View style={editStyles.formGroup}>
              <Text style={editStyles.label}>Description</Text>
              <TextInput
                style={[editStyles.textArea, errors.caption && editStyles.inputError]}
                placeholder="Write your review..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={(value) => handleChange("caption", value)}
                multiline
              />
              {errors.caption ? <Text style={editStyles.errorText}>{errors.caption}</Text> : null}
            </View>

            {/* ACTION BUTTONS */}
            <View style={editStyles.modalActions}>
              <TouchableOpacity
                style={[editStyles.modalButton, editStyles.cancelButton]}
                onPress={onClose}
                disabled={loading}
              >
                <Text style={editStyles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[editStyles.modalButton, editStyles.saveButton, loading && editStyles.disabledButton]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={editStyles.saveText}>Update</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* CustomAlert */}
        <CustomAlert
          visible={alertVisible}
          type={alertType}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}
