import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, SafeAreaView, Platform, StatusBar, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";
import api from "@/features/auth/services/auth";

export default function UsuariosScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/users");
      if (res.data?.data) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users directory:", error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    // 1. Cargamos los usuarios la primera vez
    fetchUsers();

    // 2. Creamos un "vigilante" para que los vuelva a cargar CADA VEZ que regreses a esta pantalla
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Pantalla enfocada: Recargando lista de usuarios...");
      fetchUsers();
    });

    // 3. Limpiamos el vigilante para que no haya fugas de memoria
    return unsubscribe;
  }, [navigation]);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const filteredUsers = users.filter(u => 
    (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (u.role && u.role.toLowerCase().includes(searchQuery.toLowerCase()))
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
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : filteredUsers.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <MaterialIcons name="person-off" size={48} color={COLORS.onSurfaceVariant} />
            <Text style={{ marginTop: 16, fontSize: 16, color: COLORS.onSurfaceVariant, fontWeight: '600', textAlign: 'center' }}>
              No se encontraron usuarios
            </Text>
          </View>
        ) : (
<ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
            {filteredUsers.map((user) => {
              const isTeacher = user.role === "PROFESOR";
              return (
                // 👇 AGREGAMOS EL ONDRESS AQUÍ PARA NAVEGAR A LA PANTALLA DE EDICIÓN 👇
                <Pressable 
                  key={user.id} 
                  style={styles.userCard}
                  onPress={() => {
                    console.log("Navegando a editar usuario con ID:", user.id);
                    navigation.navigate("CoordinadorEditarUsuario", { user: user });
                  }}
                >
                  <View style={[styles.cardIndicator, { backgroundColor: isTeacher ? COLORS.secondary : COLORS.primary }]} />
                  
                  <View style={styles.cardContent}>
                    <View style={styles.userInfo}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
                      </View>
                      <View style={styles.userDetails}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <View style={styles.dateRow}>
                          <MaterialIcons name="badge" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.dateText}>DNI: {user.dni}</Text>
                        </View>
                        <View style={[styles.dateRow, { marginTop: 2 }]}>
                          <MaterialIcons name="email" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.dateText} numberOfLines={1}>{user.email}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={[
                      styles.roleBadge, 
                      { backgroundColor: isTeacher ? COLORS.secondaryContainer : COLORS.primaryFixed }
                    ]}>
                      <Text style={[
                        styles.roleBadgeText, 
                        { color: isTeacher ? COLORS.onSecondaryContainer : COLORS.onPrimaryFixed }
                      ]}>
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

});
