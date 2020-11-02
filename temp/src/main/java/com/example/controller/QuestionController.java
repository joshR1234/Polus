package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Question;
import com.example.repository.QuestionRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {

	@Autowired
	private QuestionRepository questionRepository;
	
	@PostMapping("/questions")
	public Question createQuestion(@RequestBody Question question) {
		return questionRepository.save(question);
	}
	
	@GetMapping("/questions/{surveyId}")
	public Optional<List<Question>> getQuestionssBySurveyId(@PathVariable String surveyId) {
		return questionRepository.findBySurveyId(surveyId);
	}

}
