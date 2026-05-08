# 🎓 Trilce — Sistema de Gestión de Incidencias Escolares

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo_SDK-54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-green?style=for-the-badge" alt="Platform" />
</p>

Aplicación móvil multiplataforma para la **gestión de incidencias académicas** en instituciones educativas. Permite a padres, docentes y administradores reportar, dar seguimiento y resolver incidentes escolares de forma eficiente y organizada.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Tech Stack](#-tech-stack)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Roles de Usuario](#-roles-de-usuario)
- [Navegación](#-navegación)
- [Design System](#-design-system)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características

- 🔐 **Autenticación basada en roles** — Inicio de sesión con selección de rol (Padre, Docente, Administrador)
- 👨‍👩‍👧‍👦 **Panel de Padres** — Visualización y seguimiento de incidencias de sus hijos
- 👩‍🏫 **Panel de Docentes** — Registro y gestión de incidentes en el aula
- 🛡️ **Panel de Administración** — Supervisión y gestión global de incidencias
- 🎨 **Diseño Material Design 3** — Paleta de colores dinámica con soporte de temas
- 📱 **Multiplataforma** — Compatible con Android, iOS y Web
- 🔤 **Tipografía personalizada** — Plus Jakarta Sans y Manrope vía Google Fonts

---

## 🏗️ Arquitectura del Proyecto

La aplicación sigue una **arquitectura modular basada en features**, donde cada módulo funcional (auth, padre, profesor, admin) es independiente y contiene sus propias pantallas, componentes, hooks, servicios, store, tipos y utilidades.

```
                    ┌──────────────┐
                    │   App.tsx    │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ AppProvider  │
                    │  (Fonts +   │
                    │  SafeArea + │
                    │  AuthCtx)   │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ AppNavigator │
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
     ┌──────▼──────┐ ┌────▼────┐ ┌───────▼───────┐
     │   Auth      │ │ Padre   │ │   Profesor    │
     │  Navigator  │ │Navigator│ │  Navigator    │
     └─────────────┘ └─────────┘ └───────────────┘
                                        │
                                 ┌──────▼───────┐
                                 │    Admin     │
                                 │  Navigator   │
                                 └──────────────┘
```

---

## 🛠️ Tech Stack

| Tecnología | Versión | Descripción |
|---|---|---|
| **React Native** | 0.81.5 | Framework de desarrollo móvil multiplataforma |
| **Expo** | SDK 54 | Plataforma de desarrollo y build tools |
| **TypeScript** | 5.9 | Tipado estático para mayor robustez |
| **React Navigation** | 7.x | Navegación nativa con stack y tabs |
| **Expo Linear Gradient** | 15.x | Gradientes para UI moderna |
| **React Native Reanimated** | 4.1 | Animaciones fluidas y de alto rendimiento |
| **React Native Gesture Handler** | 2.28 | Manejo avanzado de gestos táctiles |
| **ESLint + Prettier** | 9.x / 3.8 | Linting y formateo de código |

---

## 📦 Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** >= 18.x
- **npm** >= 9.x (o **yarn**)
- **Expo CLI** — Se instala automáticamente con `npx expo`
- **Expo Go** (app en tu dispositivo) o un emulador configurado (Android Studio / Xcode)

---

## 🚀 Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/<tu-usuario>/desarrollo-de-aplicaciones-moviles.git
cd desarrollo-de-aplicaciones-moviles
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Inicia el servidor de desarrollo:**

```bash
npm start
```

4. **Ejecuta en tu dispositivo:**

- 📱 Escanea el código QR con **Expo Go** (Android/iOS)
- 🤖 Presiona `a` para abrir en **Android Emulator**
- 🍎 Presiona `i` para abrir en **iOS Simulator** (solo macOS)
- 🌐 Presiona `w` para abrir en el **navegador web**

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| `start` | `npm start` | Inicia el servidor de desarrollo de Expo |
| `android` | `npm run android` | Inicia directamente en emulador/dispositivo Android |
| `ios` | `npm run ios` | Inicia directamente en simulador iOS |
| `web` | `npm run web` | Inicia en el navegador web |
| `lint` | `npm run lint` | Ejecuta ESLint para análisis de código |

---

## 📂 Estructura de Carpetas

```
├── App.tsx                        # Punto de entrada de la app
├── index.ts                       # Registro del componente raíz
├── app.json                       # Configuración de Expo
├── tsconfig.json                  # Configuración de TypeScript (alias @/)
├── package.json                   # Dependencias y scripts
│
├── assets/                        # Recursos estáticos (iconos, splash)
│
└── src/
    ├── context/
    │   └── auth/
    │       ├── AuthContext.ts      # Definición del contexto y tipos (User, Role)
    │       └── AuthProvider.tsx    # Proveedor de estado de autenticación
    │
    ├── features/                  # Módulos funcionales independientes
    │   ├── auth/
    │   │   ├── screens/
    │   │   │   └── LoginScreen.tsx # Pantalla de inicio de sesión
    │   │   ├── components/        # Componentes específicos de auth
    │   │   ├── hooks/             # Custom hooks (useAuth)
    │   │   ├── services/          # Servicios API de autenticación
    │   │   ├── store/             # Estado local del módulo
    │   │   ├── types/             # Tipos TypeScript del módulo
    │   │   └── utils/             # Utilidades del módulo
    │   │
    │   ├── admin/                 # Módulo de Administrador
    │   │   ├── screens/
    │   │   │   └── AdminScreen.tsx
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── services/
    │   │   ├── store/
    │   │   ├── types/
    │   │   └── utils/
    │   │
    │   ├── padre/                 # Módulo de Padre de Familia
    │   │   ├── screens/
    │   │   │   └── PadreScreen.tsx
    │   │   └── ...                # (misma estructura)
    │   │
    │   └── profesor/              # Módulo de Profesor/Docente
    │       ├── screens/
    │       │   └── ProfesorScreen.tsx
    │       └── ...                # (misma estructura)
    │
    ├── navigation/                # Configuración de navegación
    │   ├── index.ts               # Barrel export
    │   ├── AppNavigator.tsx       # Navigator principal (role-based routing)
    │   ├── AuthNavigator.tsx      # Stack de autenticación
    │   ├── MainTabsNavigator.tsx  # Navegación por tabs
    │   ├── PadreNavigator.tsx     # Navigator del padre
    │   ├── ProfesorNavigator.tsx  # Navigator del profesor
    │   └── AdminNavigator.tsx     # Navigator del administrador
    │
    ├── providers/
    │   └── AppProvider.tsx        # Provider raíz (fonts, SafeArea, Auth)
    │
    └── shared/                    # Código compartido entre módulos
        ├── index.ts               # Barrel export
        ├── components/
        │   └── ThemedText.tsx     # Componente de texto con estilos temáticos
        ├── constants/
        │   └── colors.ts         # Paleta de colores (Material Design 3)
        ├── hooks/                 # Hooks compartidos
        ├── services/              # Servicios compartidos
        ├── types/                 # Tipos globales
        └── utils/                 # Utilidades compartidas
```

---

## 👥 Roles de Usuario

La aplicación maneja tres roles con acceso diferenciado:

| Rol | Clave | Descripción |
|---|---|---|
| 🧑‍🤝‍🧑 **Padre** | `padre` | Visualiza las incidencias de sus hijos y da seguimiento |
| 👩‍🏫 **Docente** | `docente` | Registra y gestiona incidentes dentro de su aula |
| 🛡️ **Admin** | `admin` | Supervisa y administra todas las incidencias del sistema |

La selección de rol se realiza desde la pantalla de Login mediante un selector visual antes de iniciar sesión.

---

## 🧭 Navegación

La navegación es **condicional basada en el estado de autenticación y el rol del usuario**:

```
¿Usuario autenticado?
├── NO  →  AuthNavigator (LoginScreen)
└── SÍ  →  ¿Cuál es su rol?
           ├── padre   →  PadreNavigator
           ├── docente →  ProfesorNavigator
           └── admin   →  AdminNavigator
```

Implementada con `@react-navigation/native-stack` y `@react-navigation/bottom-tabs`, envuelta en un `NavigationContainer` con `SafeAreaView`.

---

## 🎨 Design System

### Paleta de Colores

La aplicación utiliza una paleta basada en **Material Design 3** con temas cálidos:

| Token | Color | Uso |
|---|---|---|
| `primary` | `#a73300` 🟠 | Acciones principales, branding |
| `secondary` | `#5029e6` 🟣 | Elementos secundarios, acentos |
| `tertiary` | `#005cac` 🔵 | Información complementaria |
| `surface` | `#fef8f1` 🤍 | Fondo de pantallas |
| `error` | `#ba1a1a` 🔴 | Estados de error |

### Tipografía

| Fuente | Pesos | Uso |
|---|---|---|
| **Plus Jakarta Sans** | Bold, ExtraBold | Títulos, branding |
| **Manrope** | Regular, SemiBold, Bold | Cuerpo de texto, labels, botones |

---

## 🤝 Contribución

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m "feat: descripción del cambio"`
4. Sube tus cambios: `git push origin feature/nueva-funcionalidad`
5. Abre un **Pull Request**

### Convención de commits

Este proyecto sigue la convención de [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin afectar lógica)
- `refactor:` Refactorización de código
- `test:` Adición o corrección de tests

---

## 📄 Licencia

Este proyecto es de uso académico, desarrollado como proyecto final del curso **Desarrollo de Aplicaciones Móviles — Ciclo VII**.

---

<p align="center">
  Hecho con ❤️ usando <strong>React Native</strong> + <strong>Expo</strong>
</p>
