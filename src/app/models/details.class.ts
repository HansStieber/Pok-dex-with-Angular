export class Details {
    abilities: Array<object>;
    base_experience: number;
    forms: Array<object>;
    game_indices: Array<object>;
    height: number;
    held_items: Array<any>;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<object>;
    name: string;
    order: number;
    past_types: Array<any>;
    species: Object;
    sprites: Object;
    stats: Array<object>;
    types: Array<object>;
    weight: number;


    constructor(obj?: any) {
        this.abilities = obj ? obj.abilities : '';
        this.base_experience = obj ? obj.base_experience : '';
        this.forms = obj ? obj.forms : '';
        this.game_indices = obj ? obj.game_indices : '';
        this.height = obj ? obj.height : '';
        this.held_items = obj ? obj.held_items : '';
        this.id = obj ? obj.id : '';
        this.is_default = obj ? obj.is_default : '';
        this.location_area_encounters = obj ? obj.location_area_encounters : '';
        this.moves = obj ? obj.moves : '';
        this.name = obj ? obj.name : '';
        this.order = obj ? obj.order : '';
        this.past_types = obj ? obj.past_types : '';
        this.species = obj ? obj.species : '';
        this.sprites = obj ? obj.sprites : '';
        this.stats = obj ? obj.stats : '';
        this.types = obj ? obj.types : '';
        this.weight = obj ? obj.weight : '';
    }

    public toJSON() {
        return {
          abilities: this.abilities,
       base_experience: this.base_experience,
       forms: this.forms,
       game_indices: this.game_indices,
       height: this.height,
       held_items: this.held_items,
       id: this.id,
       is_default: this.is_default,
       location_area_encounters: this.location_area_encounters,
       moves: this.moves,
       name: this.name,
       order: this.order,
       past_types: this.past_types,
      species: this.species,
      sprites: this.sprites,
      stats: this.stats,
       types: this.types,
       weight: this.weight
        }
    }
}