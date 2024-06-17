package com.siutu.viaje;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/viajes")
public class ViajeController {

    @Autowired
    private ViajeRepository viajeRepository;

    @GetMapping
    public List<Viaje> obtenerTodosLosViajes() {
        return viajeRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Viaje> crearViaje(@RequestBody Viaje viaje) {
        // Obtener el ID del usuario autenticado usando Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String conductorId = authentication.getName(); // El nombre de usuario suele ser el ID

        // Verificar si el usuario tiene un viaje activo
        boolean tieneViajeActivo = viajeRepository.existsByConductorIdAndEstadoNot(conductorId, "FINALIZADO");

        if (tieneViajeActivo) {
            return ResponseEntity.badRequest().body(null); 
        } else {
            // Establecer el ID del conductor y el estado del viaje
            viaje.setConductorId(conductorId);
            viaje.setEstado("PROGRAMADO"); // O el estado inicial que corresponda

            Viaje nuevoViaje = viajeRepository.save(viaje);
            return ResponseEntity.ok(nuevoViaje);
        }
    }
}