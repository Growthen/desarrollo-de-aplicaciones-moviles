import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";
import { getUsers, getStudents } from "@/features/coordinador/services/coordinadorService";

export default function UsuariosScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("TODOS");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const [usersData, studentsData] = await Promise.all([
        getUsers(),
        getStudents(),
      ]);

      const mappedStudents = studentsData.map((s: any) => ({
        id: `student-${s.id}`,
        name: `${s.firstName} ${s.lastName}`,
        dni: s.dni,
        email: `Código: ${s.studentCode}`,
        role: "ESTUDIANTE",
        isStudent: true,
      }));

      // Excluir coordinadores de la lista
      const validUsers = usersData.filter((u: any) => u.role !== "COORDINADOR");

      setUsers([...validUsers, ...mappedStudents]);
    } catch (error) {
      console.error("Error fetching users directory:", error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    // Carga inicial
    fetchUsers();

    // Recargar al enfocar
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Pantalla enfocada: Recargando lista de usuarios...");
      fetchUsers();
    });

    return unsubscribe;
  }, [navigation]);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const filteredUsers = users.filter(
    (u) => {
      const matchSearch = 
        (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (u.role && u.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (u.dni && u.dni.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchRole = activeFilter === "TODOS" || (u.role && u.role.toUpperCase() === activeFilter);
      
      return matchSearch && matchRole;
    }
  );

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* TopAppBar */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <MaterialIcons
            name="menu"
            size={24}
            color={COLORS.onSurfaceVariant}
          />
        </Pressable>
        <Text style={styles.headerTitle}>TRILCE</Text>
        <View style={styles.profileIcon}>
          <MaterialIcons
            name="person"
            size={24}
            color={COLORS.onSurfaceVariant}
          />
        </View>
      </View>

      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={styles.title}>Directorio de Usuarios Creados</Text>
          <Text style={styles.subtitle}>
            Lista de estudiantes, padres y profesores registrados en el sistema.
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color={COLORS.onSurfaceVariant}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre, DNI o rol..."
            placeholderTextColor="rgba(91, 64, 56, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {[
              { label: "Todos", value: "TODOS", activeColor: COLORS.onSurfaceVariant, activeBg: COLORS.surfaceVariant },
              { label: "Estudiantes", value: "ESTUDIANTE", activeColor: COLORS.onPrimaryContainer, activeBg: COLORS.primaryContainer },
              { label: "Profesores", value: "PROFESOR", activeColor: COLORS.onSecondaryContainer, activeBg: COLORS.secondaryContainer },
              { label: "Padres", value: "PADRE", activeColor: COLORS.onTertiaryContainer, activeBg: COLORS.tertiaryContainer },
            ].map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <Pressable
                  key={filter.value}
                  style={[
                    styles.filterButton,
                    isActive ? { backgroundColor: filter.activeBg, borderColor: filter.activeBg } : {}
                  ]}
                  onPress={() => setActiveFilter(filter.value)}
                >
                  <Text style={[styles.filterButtonText, isActive ? { color: filter.activeColor } : {}]}>
                    {filter.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Directory Grid */}
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : filteredUsers.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
            }}
          >
            <MaterialIcons
              name="person-off"
              size={48}
              color={COLORS.onSurfaceVariant}
            />
            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                color: COLORS.onSurfaceVariant,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              No se encontraron usuarios
            </Text>
          </View>
        ) : (
<ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
            {filteredUsers.map((user) => {
              const getRoleColors = (role: string) => {
                if (role === "PROFESOR") {
                  return { indicator: COLORS.secondary, bg: COLORS.secondaryContainer, text: COLORS.onSecondaryContainer };
                } else if (role === "PADRE") {
                  return { indicator: COLORS.tertiary, bg: COLORS.tertiaryContainer, text: COLORS.onTertiaryContainer };
                } else {
                  return { indicator: COLORS.primary, bg: COLORS.primaryContainer, text: COLORS.onPrimaryContainer };
                }
              };
              const roleColors = getRoleColors(user.role);

              return (
                // Navegación a edición
                <Pressable 
                  key={user.id} 
                  style={styles.userCard}
                  onPress={() => {
                    console.log("Navegando a editar usuario con ID:", user.id);
                    navigation.navigate("CoordinadorEditarUsuario", { user: user });
                  }}
                >
                  <View style={[styles.cardIndicator, { backgroundColor: roleColors.indicator }]} />
                  
                  <View style={styles.cardContent}>
                    <View style={styles.userInfo}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {getInitials(user.name)}
                        </Text>
                      </View>
                      <View style={styles.userDetails}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <View style={styles.dateRow}>
                          <MaterialIcons
                            name="badge"
                            size={14}
                            color={COLORS.onSurfaceVariant}
                          />
                          <Text style={styles.dateText}>DNI: {user.dni}</Text>
                        </View>
                        <View style={[styles.dateRow, { marginTop: 2 }]}>
                          <MaterialIcons
                            name="email"
                            size={14}
                            color={COLORS.onSurfaceVariant}
                          />
                          <Text style={styles.dateText} numberOfLines={1}>
                            {user.email}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.roleBadge,
                        {
                          backgroundColor: roleColors.bg,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.roleBadgeText,
                          {
                            color: roleColors.text,
                          },
                        ]}
                      >
                        {user.role}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
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
    letterSpacing: -0.5,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
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
    marginBottom: 16,
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
  filterContainer: {
    marginBottom: 16,
  },
  filterScroll: {
    gap: 8,
    paddingBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
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

});
