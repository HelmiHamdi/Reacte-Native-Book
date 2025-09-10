// styles/profile.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
profileHeader: {
  alignItems: "center", // Centrer l’image
  backgroundColor: COLORS.cardBackground,
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  shadowColor: COLORS.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  borderWidth: 1,
  borderColor: COLORS.border,
  
},
  profileImage: {
  width: 120,
  height: 120,
  borderRadius: 100,
  marginBottom: 16,
  borderWidth: 3,          // épaisseur de la bordure
  borderColor: COLORS.primary,
},
profileInfoGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%",
},
  profileInfo: {
    flex: 1,
  },
infoRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 6,
},
infoBox: {
  flexDirection: "row",
  alignItems: "center",
  width: "48%", // pour avoir 2 par ligne
  marginBottom: 10,
},
username: {
  fontSize: 12,
  color: COLORS.textSecondary,
  marginLeft: 6,
},
email: {
  fontSize: 12,
  color: COLORS.textSecondary,
  marginLeft: 4,
},
memberSince: {
  fontSize: 12,
  color: COLORS.textSecondary,
  marginLeft: 6,
},
editButton: {
    flexDirection: "row",
    alignItems: "center",
    
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 15,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: "600",
    marginLeft: 8,
  },
  booksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  booksTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  booksCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  booksList: {
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bookCaption: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 4,
    flex: 1,
  },
  bookDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  deleteButton: {
    padding: 8,
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
  editProfileButton: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: COLORS.primary,
  padding: 10,
  borderRadius: 10,
  marginHorizontal: 20,
  marginTop: 10,
  justifyContent: "center",
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 5,
  elevation: 3,
},

editProfileText: {
  color: COLORS.white,
  fontWeight: "bold",
  marginLeft: 5,
},
 modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
 modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
modalCard: {
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 20,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 8,
  elevation: 5,
},

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.primary,
    textAlign: "center",
  },
inputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: COLORS.gray,
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginBottom: 12,
  backgroundColor: "#f9f9f9",
},
input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    marginRight: 10,
    padding: 10,
  },
  cancelText: {
    color: COLORS.textSecondary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
inputField: {
  flex: 1,
  fontSize: 14,
  color: COLORS.text,
},
/*
modalActions: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
},*/

modalButton: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: "center",
  marginHorizontal: 5,
},

/*cancelButton: {
  backgroundColor: COLORS.gray,
},

saveButton: {
  backgroundColor: COLORS.primary,
},

cancelText: {
  color: "#333",
  fontWeight: "bold",
},

saveText: {
  color: "#fff",
  fontWeight: "bold",
},*/
// Ajoutez ces styles à votre fichier profile.styles.js
inputGroup: {
  marginBottom: 16,
},
label: {
  fontSize: 14,
  fontWeight: "600",
  color: COLORS.textPrimary,
  marginBottom: 6,
},
inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 10,
  backgroundColor: "#f9f9f9",
},
inputError: {
  borderColor: COLORS.error,
},
inputIcon: {
  marginRight: 10,
},
errorText: {
  fontSize: 12,
  color: COLORS.error,
  marginTop: 4,
  marginLeft: 4,
},
modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  paddingBottom: 15,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
},
closeButton: {
  padding: 4,
},
disabledButton: {
  opacity: 0.6,
},

});

export default styles;