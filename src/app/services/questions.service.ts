import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http:HttpClient) { }

  //get questions of quiz
  public getQuestionsOfQuiz(qid){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }

  //get questions of quiz
  public getQuestionsOfQuizForUser(qid){
    return this._http.get(`${baseUrl}/question/quiz/user/${qid}`)
  }

  //add question
  public addQuestion(question){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(quesId){
    return this._http.delete(`${baseUrl}/question/${quesId}`)
  }

  //calculate Quiz
  public calcQuiz(questions){
    return this._http.post(`${baseUrl}/question/calc-quiz`,questions);
  }
}
