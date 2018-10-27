import { environment } from 'src/environments/environment';

export class Endpoint {
    static BaseApi = environment.ServiceBase + 'api/';
    static Token = environment.ServiceBase + 'token';

}
