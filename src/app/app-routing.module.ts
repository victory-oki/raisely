import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./userManagement/signup/signup.component";

const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "",
    redirectTo: "signup",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
