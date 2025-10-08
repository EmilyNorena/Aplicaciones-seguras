package edu.eci.arep.secure_app.dto;

public record AuthRequest(String email, String password) {
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
}
