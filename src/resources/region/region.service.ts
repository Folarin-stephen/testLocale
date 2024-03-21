import RegionModel from '@/resources/region/region.model';
import {IRegion} from '@/resources/region/region.interface';
import { State } from '@/resources/region/region.interface';
import { History } from '@/resources/region/region.interface';
import { Number } from 'mongoose';

class RegionService {
    private region = RegionModel;

    /**
     * Create a new region
     */
    public async create(_id: number, geopolitical_zone: string, states: State[],  history: History, language_Spoken: string): Promise<IRegion> {
        try {
            const region = await this.region.create({ _id, geopolitical_zone,  states, history, language_Spoken });

            return region;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default RegionService;