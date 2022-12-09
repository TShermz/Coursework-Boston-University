import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SortNamePipe } from '../sort-name.pipe';
import { FilterNamesPipe } from '../filter-names.pipe';
import { HistoryComponent } from '../history/history.component';
import { SubmissionsComponent } from '../submissions/submissions.component';
import { SummaryComponent } from '../summary/summary.component';
import { HistoryDetailComponent } from '../history-detail/history-detail.component';

@NgModule({
  declarations: [
    SortNamePipe, 
    FilterNamesPipe,
    HistoryComponent,
    HistoryDetailComponent,
    SubmissionsComponent,
    SummaryComponent 
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    SortNamePipe, 
    FilterNamesPipe,
    HistoryComponent,
    HistoryDetailComponent,
    SubmissionsComponent, 
    SummaryComponent
  ]
})

export class SharedModule {}
