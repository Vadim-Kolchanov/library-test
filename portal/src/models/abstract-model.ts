
abstract class AbstractModel {
    public id: number
    public name: string

    protected constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export default AbstractModel;
