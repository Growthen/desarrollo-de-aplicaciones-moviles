import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, SafeAreaView, Platform, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";

const DUMMY_USERS = [
  { id: '1', name: 'Laura Martínez', role: 'Profesor', date: '12 Oct 2023', initials: 'LM', isTeacher: true },
  { id: '2', name: 'Carlos Gómez', role: 'Padre', date: '15 Oct 2023', initials: 'CG', isTeacher: false },
  { id: '3', name: 'David Rodríguez', role: 'Profesor', date: '20 Oct 2023', initials: 'DR', isTeacher: true },
  { id: '4', name: 'Ana Pérez', role: 'Padre', date: '22 Oct 2023', initials: 'AP', isTeacher: false },
];

export default function UsuariosScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = DUMMY_USERS.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <MaterialIcons name="person" size={24} color={COLORS.onSurfaceVariant} />
        </View>
      </View>

      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={styles.title}>Directorio de Usuarios Creados</Text>
          <Text style={styles.subtitle}>Lista de padres y profesores creados por el coordinador actual.</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={COLORS.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o rol..."
            placeholderTextColor="rgba(91, 64, 56, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Directory Grid */}
        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {filteredUsers.map((user) => (
            <Pressable key={user.id} style={styles.userCard}>
              <View style={[styles.cardIndicator, { backgroundColor: user.isTeacher ? COLORS.secondary : COLORS.primary }]} />
              
              <View style={styles.cardContent}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.initials}</Text>
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <View style={styles.dateRow}>
                      <MaterialIcons name="calendar-today" size={14} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.dateText}>Creado el {user.date}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={[
                  styles.roleBadge, 
                  { backgroundColor: user.isTeacher ? COLORS.secondaryContainer : COLORS.primaryFixed }
                ]}>
                  <Text style={[
                    styles.roleBadgeText, 
                    { color: user.isTeacher ? COLORS.onSecondaryContainer : COLORS.onPrimaryFixed }
                  ]}>
                    {user.role}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Floating Action Button (FAB) */}
      <Pressable 
        style={styles.fab}
        onPress={() => {
          navigation.navigate('CoordinadorRegistrarUsuario');
        }}
      >
        <MaterialIcons name="add" size={28} color={COLORS.onPrimaryContainer} />
      </Pressable>
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
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.3)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageHeader: {
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 12,
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
    paddingBottom: 100, // Space for FAB
    gap: 16,
  },
  userCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    padding: 16,
    position: "relative",
    overflow: "hidden",
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  cardIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceVariant,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primary,
  },
  userDetails: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: "500",
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: Platform.OS === 'ios' ? 100 : 80, // Above tab bar
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryContainer,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 6,
  },
});
