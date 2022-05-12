import { useWeb3React} from '@web3-react/core'
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';

const punks = () => {
    const {active } = useWeb3React();

    if (!active) return <RequestAccess />;
    
    return (
        <>
        <p>gallery</p>
        </>
    )
};

export default punks;