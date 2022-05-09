import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import jesuspunksArtifacts from "../../config/web3/artifacts/jesusPunks";

const { address, abi } = jesuspunksArtifacts;

const useJesuspunks = () => {

    const { active, library, chainId } = useWeb3React();

    const jesuspunks = useMemo(
        () => {
            if(active) return new library.eth.Contract(abi, address[chainId])
        },
        [active, chainId, library?.eth?.Contract]);

        return jesuspunks;
}
export default useJesuspunks;