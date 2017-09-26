import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';

export const observeGainNodeChanges = (value, debounceTime) => {
    return Observable.of(value).debounceTime(debounceTime);
}