package com.siutu.config;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Cargar el archivo JSON de Firebase desde el directorio de recursos
        Resource resource = new ClassPathResource("siutu-2c66c-firebase-adminsdk-h9tp6-0169b95ba8.json");
        InputStream serviceAccount = resource.getInputStream();

        // Construir las opciones de Firebase con los métodos actualizados
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        return FirebaseApp.initializeApp(options);
    }
}