import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'prefix'
  },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'books',
        loadChildren: () => import('../books/books.module').then(m => m.BooksModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule { }
