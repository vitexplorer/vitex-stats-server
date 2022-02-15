import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements AfterViewInit {

  searchKey: string = '';

  @ViewChild('input') input!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.searchKey = this.input.nativeElement.value;
        })
      )
      .subscribe();

  }

  clearSearch() {
    this.searchKey = '';
    this.input.nativeElement.value = '';
  }


}
