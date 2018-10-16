import AxiosHeaderProducer from './AxiosHeaderProducer';

const HeaderAdderProtocol = {

    getHeaderAdder: () => new AxiosHeaderProducer(),
};

export default HeaderAdderProtocol;