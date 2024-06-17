package com.siutu.reserva;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservaRepository extends MongoRepository<Reserva, String> {
    List<Reserva> findByViajeId(String viajeId);
}