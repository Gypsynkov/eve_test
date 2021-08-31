export default class EVEService {
    _apiBase = "https://esi.evetech.net";
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
      }
      return await res.json();
    }
  

    async getSolarSystem(id) {
        const systems = await this.getResource(`/v3/universe/systems/${id}`);
        return systems
      }


    async getAllFactions() {
      const res = await this.getResource(`/v1/universe/factions/`);
      return res.map(this._transformSystems)
    }

    async getCorporation(id) {
        if(id !== 0){
        const corporation = await this.getResource(`/v4/corporations/${id}`);
        return corporation
        } else{
            return{
                name: "Noname"
            }
        }
      }
    
      async getCeo(id) {
        if(id!==1){
          const ceo = await this.getResource(`/v3/characters/${id}`);
          return ceo
        }else{
          return{
            name:'Noname'
          }
        }
        
      }

      async getRace(id) {
          const race = await this.getResource(`/legacy/universe/races/${id}`);
          return race
    
        
      }

  
    _transformSystems(faction) {
      return {
        name: faction.name,
        description: faction.description,
        corp_id: faction.corporation_id,
        system_id: faction.solar_system_id,
      }
    }
  }

  // const data = new EVEService();
  // data.getRace().then((data)=>(console.log(data)))
  