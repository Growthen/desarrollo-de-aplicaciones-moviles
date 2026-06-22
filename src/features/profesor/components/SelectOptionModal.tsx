import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";

export type SelectOptionItem<T> = {
  id: string | number;
  label: string;
  subtitle?: string;
  value: T;
};

type SelectOptionModalProps<T> = {
  visible: boolean;
  title: string;
  items: SelectOptionItem<T>[];
  onSelect: (item: T) => void;
  onClose: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  emptyStateLabel?: string;
};

export default function SelectOptionModal<T>({
  visible,
  title,
  items,
  onSelect,
  onClose,
  searchValue,
  onSearchChange,
  placeholder = "Buscar",
  emptyStateLabel = "No se encontraron resultados",
}: SelectOptionModalProps<T>) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <ThemedText type="brandSubtitle" style={styles.title}>
            {title}
          </ThemedText>
          {onSearchChange ? (
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={searchValue}
              onChangeText={onSearchChange}
              style={[styles.input, styles.searchInput]}
            />
          ) : null}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelect(item.value)}
              >
                <ThemedText type="body">{item.label}</ThemedText>
                {item.subtitle ? (
                  <ThemedText type="label">{item.subtitle}</ThemedText>
                ) : null}
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <ThemedText type="body" style={styles.emptyText}>
                {emptyStateLabel}
              </ThemedText>
            )}
          />
          <Pressable onPress={onClose} style={styles.modalClose}>
            <ThemedText type="link">Cerrar</ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "60%",
  },
  title: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.onSurface,
    fontFamily: "Manrope_400Regular",
  },
  searchInput: {
    marginBottom: 8,
  },
  list: {
    gap: 8,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainerHigh,
  },
  modalClose: {
    marginTop: 8,
    alignItems: "center",
  },
  emptyText: {
    paddingVertical: 16,
  },
});
