import stateModel from "@/resources/state/state.model";
import { ILocalGovernments } from "@/resources/state/state.interface";
import { IState } from "@/resources/state/state.interface";
import { IOverview } from "@/resources/state/state.interface";




class stateService {
    private state = stateModel;

    /**
     * Create a new region
     */
    
    public async create(_id: number, name: string, geopolitical_zone: string,  localGovernments: ILocalGovernments[],  overview: IOverview, language_Spoken: string): Promise<IState> {
        try {
            const state = await this.state.create({ _id,  name, geopolitical_zone, localGovernments, overview, language_Spoken });

            return state;
        } catch (error) {
                     console.log(error)
            throw new Error('Unable to create state');
   
        }
    }
}

export default stateService;