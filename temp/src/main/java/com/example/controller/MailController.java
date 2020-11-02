package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.exception.ResourceNotFoundException;
import com.example.model.MailMessage;
import com.example.model.Survey;
import com.example.model.User;
import com.example.repository.SurveyRepository;
import com.example.repository.UserRepository;
import com.example.service.MailService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class MailController {

	@Autowired
	private MailMessage message;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SurveyRepository surveyRepository;
	
	@Autowired
	private MailService notificationService;
	
	@PostMapping("/mail")
	@ResponseBody
	public void mailLink(@RequestParam String[] packedInfo) {
		String surveyId = "";
		String username = "";
		try {
			surveyId = packedInfo[0];
			username = packedInfo[1];
		} catch (Exception e) {
			System.out.print(e);
			System.out.print("packed info missing in mailLink in MailController");
		}
		Survey survey = surveyRepository.findByUrl(surveyId)
				.orElseThrow(() -> new ResourceNotFoundException("mailLink: Survey with id dne"));
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("mailLink: Employee with id dne"));
		
		/*
		 * Here we will call sendEmail() for Sending mail to the sender.
		 */
		try {
			message.setEmailAddress(user.getEmail()); // Receiver's email address
			message.setSubject("Your custom survey link!");
			message.setBodyText("Please click or share the following in order to take your survey: "
					+ "http://localhost:4200/take-survey/" + survey.getUrl());
			
			notificationService.sendEmail(message);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}

	}
	


}
