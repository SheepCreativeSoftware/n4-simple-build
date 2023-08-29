import { buntstift } from 'buntstift';
import { initCliPromt } from './initCliPromt';

const initProject = () => {
	buntstift.verbose('Init Project');
	initCliPromt();
};

export { initProject };
