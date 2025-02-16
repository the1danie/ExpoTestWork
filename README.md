# 📘 Инструкция по запуску проекта Expo

### 🔗 Запустить проект через Expo по ссылке:
[Expo проект](https://expo.dev/preview/update?message=%D0%9F%D0%B5%D1%80%D0%B2%D0%B0%D1%8F%20%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F&updateRuntimeVersion=1.0.0&createdAt=2025-02-16T08%3A06%3A27.737Z&slug=exp&projectId=c80795c6-342b-46d0-942a-dc3d5c700c7e&group=796ce6ba-b3af-414a-80b4-d95f115be5cd)

## 📌 Установка и настройка

### 1️⃣ Установите Node.js и npm  
Скачайте и установите последнюю версию [Node.js](https://nodejs.org/) (включает npm).

Проверьте установку командой:  
```sh
node -v
npm -v
```

### 2️⃣ Установите Expo  
Если у вас ещё нет Expo, установите его глобально:  
```sh
npm i expo
```

Проверьте, что Expo установлен:  
```sh
expo --version
```

---

## 🚀 Запуск проекта

### 1️⃣ Установите зависимости  
В корневой папке проекта выполните:  
```sh
npm install
```

### 2️⃣ Запустите Expo  
```sh
npm start
```
Или  
```sh
expo start
```

После этого появится QR-код в терминале.

---

## 📱 Запуск на устройстве

### 📲 Android / iOS  
1. Установите приложение **Expo Go**:
   - [Android (Google Play)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)
   
2. Отсканируйте QR-код из терминала в **Expo Go**.

### 🖥 Эмулятор  
- **Android**: Запустите `Android Emulator` через **Android Studio** и выберите `Run on Android device/emulator` в Expo.
- **iOS**: Запустите `iOS Simulator` через **Xcode** (только на macOS) и выберите `Run on iOS Simulator` в Expo.

---

## ⚡ Дополнительные команды

### 🔄 Очистка кеша  
Если возникают ошибки, попробуйте запустить:  
```sh
expo start -c
```

### 🔥 Сборка проекта  
- **Android (APK/AAB)**:  
  ```sh
  expo build:android
  ```
- **iOS (только на macOS)**:  
  ```sh
  expo build:ios
  ```

### 🌍 Запуск на вебе  
```sh
expo start --web
```

---

Теперь ваш проект готов к работе! 🚀🎉
