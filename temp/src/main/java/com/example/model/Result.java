package com.example.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "results")
public class Result {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Basic
	private float score;
	
	@NotBlank
	private String providedAnswers;
	
	@NotBlank
	private String takerId;
	
	@NotBlank
	private String surveyId;
	
	public Result() {}
	
	public Result(String takerId, String surveyId, String providedAnswers, float score) {
		this.takerId = takerId;
		this.surveyId = surveyId;
		this.providedAnswers = providedAnswers;
		this.score = score;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public String getProvidedAnswers() {
		return providedAnswers;
	}

	public void setProvidedAnswers(String providedAnswers) {
		this.providedAnswers = providedAnswers;
	}

	public String getTakerId() {
		return takerId;
	}

	public void setTakerId(String takerId) {
		this.takerId = takerId;
	}

	public String getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(String surveyId) {
		this.surveyId = surveyId;
	}

	
}