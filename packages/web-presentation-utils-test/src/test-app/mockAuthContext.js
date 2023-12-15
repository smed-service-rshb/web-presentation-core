export class User {
    surname = surname => {
        this._surname = surname
    };
    name = name => {
        this._name = name
    };
    middleName = middleName => {
        this._middleName = middleName
    };
    mobilePhone = mobilePhone => {
        this._mobilePhone = mobilePhone
    };
    email = email => {
        this._email = email
    };
    position = position => {
        this._position = position
    };

    build = () => ({
        surname: this._surname,
        name: this._name,
        middleName: this._middleName,
        mobilePhone: this._mobilePhone,
        email: this._email,
        position: this._position,
    });

    static defaultUser = () => {
        const user = new User();
        user.surname("Пупкин");
        user.name("Вася");
        user.middleName("Сергеевич");
        user.mobilePhone("900 000 00 00");
        user.email("mail@mail.ru");
        user.position("ОПР");
        return user;
    }
}

export class Rights {
    rights = [];

    addAll = rights => {
        this.rights.push(...rights);
    };

    build = () => [...this.rights];

    static defaultRights = () => new Rights()
}