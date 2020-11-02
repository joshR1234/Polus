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

import com.example.model.Result;
import com.example.repository.ResultRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ResultController {

	@Autowired
	private ResultRepository resultRepository;
	
	@GetMapping("/results/{surveyId}")
	public Optional<List<Result>> getQuestionssBySurveyId(@PathVariable String surveyId) {
		return resultRepository.findBySurveyId(surveyId);
	}
	
	@PostMapping("/results/grade")
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
