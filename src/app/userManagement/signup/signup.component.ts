import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { AuthService } from "src/app/service/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading: boolean;
  @ViewChild("successModal") successModal: ElementRef;
  public subscription = new Subscription();
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.setSignUpForm();
  }

  isInvalid(val: string) {
    if (val === "confirmPassword")
      return this.signupForm.hasError("notSame") || this[val].invalid;
    return this[val].invalid;
  }

  setSignUpForm() {
    this.signupForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ],
        ],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.isMatch }
    );
  }

  // matching Validation
  isMatch(group: FormGroup): { [key: string]: any } {
    let password = group.get("password").value;
    let confirmPassword = group.get("confirmPassword").value;
    if (password !== confirmPassword && password) {
      return { notSame: true };
    } else {
      return null;
    }
  }

  get firstName() {
    return this.signupForm.get("firstName");
  }
  get lastName() {
    return this.signupForm.get("lastName");
  }
  get email() {
    return this.signupForm.get("email");
  }
  get password() {
    return this.signupForm.get("password");
  }
  get confirmPassword() {
    return this.signupForm.get("confirmPassword");
  }

  submit(val) {
    this.isLoading = true;
    delete val.confirmPassword;
    const payload = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: {
        ...val,
      },
    };
    this.postValue(payload);
  }

  postValue(payload) {
    this.subscription.add(
      this.authService.signup(payload).subscribe(
        (data) => {
          this.successModal.nativeElement.click();
          this.isLoading = false;
          console.log(data);
        },
        (error) => {
          this.isLoading = false;
          alert("Something bad happened, Check your internet connection");
          console.log(error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
