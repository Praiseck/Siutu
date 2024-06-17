package com.siutu.reserva;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siutu.usuario.Usuario;
import com.siutu.usuario.UsuarioRepository;
import com.siutu.viaje.Viaje;
import com.siutu.viaje.ViajeRepository;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ViajeRepository viajeRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> reservarViaje(@RequestParam String viajeId, @RequestParam String usuarioId) {
        Optional<Viaje> viajeOptional = viajeRepository.findById(viajeId);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);
        
        if (viajeOptional.isPresent() && usuarioOptional.isPresent()) {
            Viaje viaje = viajeOptional.get();
            Usuario usuario = usuarioOptional.get();
            
            if (viaje.getAsientosDisponibles() > 0) {
                viaje.setAsientosDisponibles(viaje.getAsientosDisponibles() - 1);
                viajeRepository.save(viaje);

                // Crear una reserva
                Reserva reserva = new Reserva(viajeId, usuario, LocalDateTime.now(), true);
                reservaRepository.save(reserva);

                return ResponseEntity.ok("Reserva realizada con éxito.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No hay asientos disponibles en este viaje.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Viaje o usuario no encontrado.");
        }
    }

    // Nuevo endpoint para listar las reservas de un viaje
    @GetMapping("/viaje/{viajeId}")
    public ResponseEntity<?> obtenerReservasPorViaje(@PathVariable String viajeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String correoUsuarioAutenticado = authentication.getName();
        
        Optional<Viaje> viajeOptional = viajeRepository.findById(viajeId);
        if (viajeOptional.isPresent()) {
            Viaje viaje = viajeOptional.get();
            if (viaje.getConductorId().equals(correoUsuarioAutenticado)) {
                List<Reserva> reservas = reservaRepository.findByViajeId(viajeId);
                return ResponseEntity.ok(reservas);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para ver las reservas de este viaje.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Viaje no encontrado.");
        }
    }
}