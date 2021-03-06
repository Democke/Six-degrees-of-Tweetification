import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * @example A service that caches user inputs in order to persist data across navigation, as components lose their state when destroyed.
 */
@Injectable()
export class InputCacheService {
    constructor() {}
    previousUsersSubject = new BehaviorSubject(['', '']);

    previousHashSubject = new BehaviorSubject(['', '']);

    getPreviousHashes(): BehaviorSubject<string[]> {
        return this.previousHashSubject;
    }

    cachePreviousHashes(hash1: string, hash2: string) {
        this.previousHashSubject.next([hash1, hash2]);
    }

    getPreviousUsers(): BehaviorSubject<string[]> {
        return this.previousUsersSubject;
    }

    cachePreviousUsers(user1: string, user2: string) {
        this.previousUsersSubject.next([user1, user2]);
    }
}
