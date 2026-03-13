#  Photo Gallery Web App

A responsive **React Photo Gallery Application** that fetches images from an external API, allows users to search photos by author, and mark photos as favourites with persistence using **localStorage**.

---

# Demo Video

Link : https://youtu.be/B_SASCCcBu8

---

#  Screenshots
screenshots/Screenshot 2026-03-14 014518.png

---

#  Tech Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **JavaScript**

---

#  Features

###  Photo Gallery
- Fetches photos *
- Displays photos in a **responsive grid layout**

###  Search Functionality
- Search photos by **author name**
- Real-time filtering as the user types

### Favourites System
- Users can mark photos as **favourites**
- Toggle favourite status using a heart icon

###  Persistent Storage
- Favourites are saved in **localStorage**
- Remain even after refreshing the page

###  Performance Optimizations
- **useMemo** for efficient filtering
- **useCallback** for stable function references
- **Lazy loading images** to improve performance

###  Responsive UI
- Works across **mobile, tablet, and desktop**

---

#  React Concepts Used

This project demonstrates the following React concepts:

### Custom Hooks
- `useFetchPhotos`
- Encapsulates API fetching logic

### Reducer Pattern
- `useReducer` used for managing favourites
- Handles toggle actions cleanly

### Memoization
- `useMemo` prevents unnecessary recalculations
- `useCallback` prevents unnecessary re-renders

### Side Effects
- `useEffect` used for:
  - API calls
  - Saving favourites to localStorage

---
