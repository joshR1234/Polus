package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Result;
import com.example.model.Survey;
import com.example.repository.SurveyRepository;
import com.example.repository.ResultRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class SurveyController {

	@Autowired
	private SurveyRepository surveyRepository;
	
	@Autowired
	private ResultRepository resultRepository;
	
	@PostMapping("/surveys")
	public Survey createSurvey(@RequestBody Survey survey) {
		return surveyRepository.save(survey);
	}
	
	@GetMapping("/surveys")
	public List<Survey> getAllUsers(){
		return surveyRepository.findAll();
	}
	
	@GetMapping("/surveys/single/{url}")
	public ResponseEntity<Survey> getSurveyById(@PathVariable String url) {
		Survey survey = surveyRepository.findByUrl(url)
				.orElseThrow(() -> new ResourceNotFoundException("getSurveyById: Survey with id: " + url + " dne"));
		return ResponseEntity.ok(survey);
	}
	
	@GetMapping("/surveys/{owner}")
	public Optional<List<Survey>> getSurveysByUsername(@PathVariable String owner) {
		return surveyRepository.findByOwner(owner);
	}

	@PostMapping("/surveys/grade")
	public Result gradeSurvey(@RequestBody String[] infoDump) {
		String providedAnswers = "";
		for(int i = 3; i<infoDump.length; i++) {
			providedAnswers += infoDump[i];
			if(i!=infoDump.length-1) {
				providedAnswers += ", ";
			}
		}
		//Result(String takerId, String surveyId, String providedAnswers, float score)
		Result result = new Result(infoDump[0], infoDump[1], providedAnswers, Float.valueOf(infoDump[2]));
		return resultRepository.save(result);
	}

	
}
