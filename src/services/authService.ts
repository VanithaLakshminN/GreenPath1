// src/services/authService.ts

// This matches the address where your Spring Boot app is running
const API_BASE_URL = "http://localhost:8080/api/auth"; 

export const authService = {
  // Method to handle user registration
  async signup(email, password) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email, 
        passwordHash: password // This maps to your Java User entity field
      })
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },

  // Method to handle user login
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Login failed");
    }
    
    return response.json();
  }
};