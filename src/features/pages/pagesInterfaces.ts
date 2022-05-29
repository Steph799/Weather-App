export enum StatusPage {
    weather, favorites, NotFound
}
 
export interface PagesState {
    page: StatusPage
}