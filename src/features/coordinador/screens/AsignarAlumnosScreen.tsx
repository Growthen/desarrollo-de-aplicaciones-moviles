import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, SafeAreaView, Platform, StatusBar, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";

const DUMMY_STUDENTS = [
  { id: '1', name: 'Sofia Martinez', grade: 'Grado 10° - Ciencias', average: 'A', checked: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrrhjjsAyW4djGZgM_1kFDb3Lcqve-JxEi82sAhZseWhbeYutT7-KeREQX1mE3mWKbcm9_AqNCA_RnC-UruoJrhFcAN8IyD7ENblu1rGDm6JvIaEXX4lqCri9p_eHUBD6ChojqTktf-K0bHZcibzuQ6aU-5HliTZPaqFPbJelKbtP4vMbgJ9pgrONSKejLZMMYy5FSEMeUNRsWXVekpXUn3IMM17EQxyiIH2mGvTd1hXj3frSWKCNdnMz4F3PimS97OQR4tzEW53Q' },
  { id: '2', name: 'Lucas Ramirez', grade: 'Grado 10° - Humanidades', checked: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR7rCeWvF9drnmfraDQcJtqfCzcYvYfBhq0P80kh4o-krJRHTvrbXQSPGWCP1YBnohev9zUOvRPQy_iOHb-ONPhjT2ayVV3VB-Vkms2UWpE40zKoO3CQ1dELrmgpeBUZ4QHGRqcd3DIAY_vzof44dTt_RlgE1jyCsSTNfaNskvMnps3USZMTXE2fq6_zfCB2XOG74y18Oh6n9LoFjAOO2PVEzKFNg1yB0lPQzp7_Lus9wBcJx3T1JIzqjZXbU67j2X_bbOjuDTA9A' },
  { id: '3', name: 'Valentina Jimenez', grade: 'Grado 10° - Ciencias', average: 'B+', checked: true, initials: 'VJ' },
  { id: '4', name: 'Camila Torres', grade: 'Grado 10° - Artes', checked: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcI0HkWgYXIB2xcZrZkg0PnkxHr9EnPaYUeJXmfjHht3LrDWagtHX-jBNui96OvRfCt4Rjob0igTCfM3Txrd8Ra_DMQ1VlMiKwBme4LEFw1JznOLrUBXMeeIcz2qsk-2fL7udyv5Jr7pA8NHqJsXJQ_FQbSVcSnFB-dzO83vYgude9MS88GjX6nOreP_q2tZNTq4HX2bHpyuz0QSnqBOSG-3uDIhr1t-PIPQ1pX-dPInYC1NEqez2Vip0vlKkIyOztMf6bsvtF0BQ' },
];

export default function AsignarAlumnosScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(DUMMY_STUDENTS);

  const toggleStudent = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* TopAppBar */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <MaterialIcons name="menu" size={24} color={COLORS.onSurfaceVariant} />
        </Pressable>
        <Text style={styles.headerTitle}>TRILCE</Text>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person" size={24} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={18} color={COLORS.primary} />
            <Text style={styles.backButtonText}>Atrás</Text>
          </Pressable>
          <Text style={styles.title}>Asignar Alumnos al Curso</Text>
          <Text style={styles.subtitle}>Selecciona los estudiantes para inscribirlos en este nuevo grupo.</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={COLORS.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alumnos..."
            placeholderTextColor="rgba(91, 64, 56, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Students List */}
        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {filteredStudents.map((student, index) => (
            <Pressable 
              key={student.id} 
              style={[
                styles.studentCard,
                // Apply alternating margins to mimic the "Asymmetric Editorial Style" from HTML
                index % 2 === 0 ? { marginLeft: 0, marginRight: 16 } : { marginLeft: 16, marginRight: 0 }
              ]}
              onPress={() => toggleStudent(student.id)}
            >
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, student.checked && styles.checkboxChecked]}>
                  {student.checked && <MaterialIcons name="check" size={16} color={COLORS.onPrimary} />}
                </View>
              </View>

              <View style={[styles.avatarContainer, !student.image && styles.avatarInitials]}>
                {student.image ? (
                  <Image source={{ uri: student.image }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.initialsText}>{student.initials}</Text>
                )}
              </View>

              <View style={styles.studentInfo}>
                <Text style={[styles.studentName, student.checked && { color: COLORS.primary }]}>
                  {student.name}
                </Text>
                <Text style={styles.studentGrade}>{student.grade}</Text>
              </View>

              {student.average && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>Promedio: {student.average}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Action Area */}
      <View style={styles.bottomActionArea}>
        <Pressable 
          style={styles.saveButton}
          onPress={() => {
            // TODO: Save course and return to courses
            navigation.navigate('CursosScreenPlaceholder');
          }}
        >
          <Text style={styles.saveButtonText}>Guardar Curso</Text>
          <MaterialIcons name="check-circle" size={20} color={COLORS.onPrimary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    flex: 1,
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageHeader: {
    marginTop: 8,
    marginBottom: 24,
    marginLeft: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    paddingHorizontal: 12,
    marginBottom: 24,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Space for the bottom button
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.15)",
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 32,
    elevation: 1,
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  avatarInitials: {
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  initialsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  studentGrade: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  badgeContainer: {
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.onSurfaceVariant,
  },
  bottomActionArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    backgroundColor: "rgba(254, 248, 241, 0.95)",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 8,
    width: "100%",
    maxWidth: 400,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  saveButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});
