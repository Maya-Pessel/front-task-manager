import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {empty, Observable, Subject, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {catchError, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  //refreshingAccessToken: boolean

  //accessTokenRefreshed: Subject<any> = new Subject()

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error)

        if(error.status === 401){
          // actualiser le refresh token
          //return this.refreshAccessToken()
            /*.pipe(
              switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError((err: any)=>{
                console.log(err);
                this.authService.logout()
                return empty();
              })
            )*/

          this.authService.logout()
        }
        return throwError(error)
      })
    )
  }

  /*refreshAccessToken(){
     if (this.refreshingAccessToken){
        return new Observable(observer =>{
          this.accessTokenRefreshed.subscribe(() => {
            // ce code va etre lu si le token a ete actualisé
            observer.next();
            observer.complete();
          })
        })
     }else{
        this.refreshingAccessToken = true;
        return this.authService.getNewAccessToken().pipe(
          tap(()=>{
            console.log("access token refreshed")
            this.refreshingAccessToken = false;
            this.refreshingAccessToken.next();
          })
        )
     }
  }*/


  addAuthHeader(request: HttpRequest<any>){
    const token = this.authService.getAccessToken()

    if(token){
      return request.clone({
        setHeaders:{
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
