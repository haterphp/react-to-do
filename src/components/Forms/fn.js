class Observer {
    constructor(setter) {
        this.setter = setter;
    }

    handler(name, attr = "value"){
        function wrapper (event) {
            this.setter(body => ({
                ...body,
                [name]: event.target[attr]
            }))
        }
        return wrapper.bind(this);
    }
}

export function useObserver(setter){
    return new Observer(setter)
}
