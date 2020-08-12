import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public signup(data: ISignupPayload): Observable<any> {
    const requestUrl = `https://api.raisely.com/v3/signup`;
    return this.httpClient.post<any>(requestUrl, data);
  }
}
export interface ISignupPayload {
  campaignUuid: string;
  data: ISignUpDetail;
}

export interface ISignUpDetail {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
