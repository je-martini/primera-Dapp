import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

const useJesuspunks = () => {

    const { active, library, chainId } = useWeb3React();

    const jesuspunks = useMeno(
        () => new library.eth.Contract("<<ADDRESS>>",abi),
        [active, chainId, library?.eth?.Contract]);
}
export default useJesuspunks;