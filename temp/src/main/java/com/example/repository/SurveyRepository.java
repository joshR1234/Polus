package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Survey;


@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
	Optional<List<Survey>> findByOwner(String owner);
	Optional<Survey> findByUrl(String url);
}