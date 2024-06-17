package com.siutu.usuario;

import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde el frontend
public class UsuarioController {


    private UsuarioRepository usuarioRepository;


    public Usuario login(@RequestBody String idToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            Optional<Usuario> usuarioOptional = usuarioRepository.findByCorreoElectronico(decodedToken.getEmail());
            if (usuarioOptional.isPresent()) {
                return usuarioOptional.get();
            } else {
                throw new RuntimeException("Usuario no encontrado");
            }
        } catch (FirebaseAuthException | RuntimeException e) {
            throw new RuntimeException("Error al procesar la solicitud", e);
        }
    }
}
