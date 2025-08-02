import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { DatePipe } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { FormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LazyLoadImgDirective } from "./directives/lazy-load-img.directive";
import { DropdownModule } from "primeng/dropdown";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { Ng2SharedChartModule } from "../ng2-shared-chart/ng2-shared-chart.module";

const routes: Routes = [{ path: "", component: NavbarComponent }];

@NgModule({
  declarations: [NavbarComponent, LazyLoadImgDirective],
  imports: [
    CommonModule,
    SidebarModule,
    // BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    Ng2SharedChartModule,
    HttpClientModule,
    ButtonModule,

    RouterModule.forChild(routes),
  ],
  exports: [NavbarComponent, LazyLoadImgDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
})
export class SharedModule {}
