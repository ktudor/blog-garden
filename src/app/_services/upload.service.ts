import { Injectable } from '@angular/core'
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders, HttpHeaderResponse } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { UploadFile } from '@app/_models'

const urlMultiple = 'http://localhost:3000/multiple-upload'
const urlSingle = 'http://localhost:3000/single-upload'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(files: Set<UploadFile>, uploadedFiles: String[]):
    { [key: string]: { progress: Observable<number> } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(uploadFile => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();

      //formData.append('file', file, file.name);
      //const files = new Array(file);
      //const filesString = JSON.stringify(files);
      // Api wants data as array named files
      formData.append('image', uploadFile.file);
      const test1 = formData.getAll('image');

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', urlSingle, formData, {
        reportProgress: true
      });
      //req.headers.set('access-control-allow-origin',"http://localhost:4200/");

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.post<any>(urlSingle, formData,
        { reportProgress: true,
          observe: 'events',
          responseType: 'text' as 'json'
        }).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {

            // calculate the progress percentage
            const percentDone = Math.round(100 * event.loaded / event.total);

            // pass the percentage into the progress-stream
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {
            // Add filename to returned array.
            uploadedFiles.push(event.body);

            // Close the progress-stream if we get an answer form the API
            // The upload is complete
            progress.complete();
          }
      });

      // Save every progress-observable in a map of all observables
      status[uploadFile.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  getFileUploadHeader() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ // Angular's HttpHeader
  //    'Content-Type': 'multipart/form-data',
      'Accept': 'application/json', // some google searches suggested i drop this but it still doesnt work
      'Authorization': 'Bearer ' + token,
      'access-control-allow-origin': "http://localhost:4200/"
    });
    return headers;
  }
}