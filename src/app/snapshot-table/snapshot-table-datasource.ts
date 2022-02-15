import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Snapshot } from '../snapshot';
import { SnapshotService } from '../snapshot.service';



export class SnapshotTableDataSource extends DataSource<Snapshot> {
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;

    snapshotCount: number = 0;

    private snapshotSubject = new BehaviorSubject<Snapshot[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private snapshotService: SnapshotService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<Snapshot[] | readonly Snapshot[]> {
        return this.snapshotSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.snapshotSubject.complete();
        this.loadingSubject.complete();
    }

    loadSnapshot(account: string = '',
        sortOrder: string = 'desc',
        sortColumn: string = 'height',
        pageIndex: number = 0,
        pageSize: number = 20): void {

        this.loadingSubject.next(true);
        this.snapshotService.getAccountSnapshots(account,
            sortOrder, sortColumn, pageIndex, pageSize).pipe(
                catchError(() => of({
                    "count": 0,
                    "err": "ok",
                    "pageIdx": 0,
                    "pageSize": 10,
                    "snapshotBlocks": []
                })),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe(
                data => {
                    this.snapshotSubject.next(data.snapshotBlocks);
                    this.snapshotCount = data.count;
                }
            );
    }
}