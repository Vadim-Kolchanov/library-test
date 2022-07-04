
abstract class AbstractModel {
    id: number
    name: string

    protected constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export default AbstractModel;
