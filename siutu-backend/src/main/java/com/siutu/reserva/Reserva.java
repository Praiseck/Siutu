package com.siutu.reserva;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.siutu.usuario.Usuario;

@Document("reservas")
public class Reserva {

    @Id
    private String id;
    private String viajeId; 
    @DBRef
    private Usuario usuario; // Cambiado de usuarioId a Usuario
    private LocalDateTime fechaHoraReserva; 
    private boolean estado; 

    // Constructor vacío
    public Reserva() {}

    // Constructor con atributos
    public Reserva(String viajeId, Usuario usuario, LocalDateTime fechaHoraReserva, boolean estado) {
        this.viajeId = viajeId;
        this.usuario = usuario;
        this.fechaHoraReserva = fechaHoraReserva;
        this.estado = estado;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getViajeId() {
        return viajeId;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public LocalDateTime getFechaHoraReserva() {
        return fechaHoraReserva;
    }

    public boolean isEstado() {
        return estado;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setViajeId(String viajeId) {
        this.viajeId = viajeId;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setFechaHoraReserva(LocalDateTime fechaHoraReserva) {
        this.fechaHoraReserva = fechaHoraReserva;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}