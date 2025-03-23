import User from '../types/user';

class UserService {
    static currentUser;

    static getCurrentUser() {
        return UserService.currentUser;
    };
    
    static loginUser(username) {
        UserService.currentUser = new User(username);
    };
}

export default UserService;