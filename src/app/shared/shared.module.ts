import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { SuccessModalComponent } from "./success-modal/success-modal.component";

@NgModule({
  declarations: [SuccessModalComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [SuccessModalComponent],
})
export class SharedModule {}
