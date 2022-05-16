import { useCallback, useEffect, useState } from "react";
import useJesuspunks from "../useJesuspunks";

const getPunkData = async ({jesuspunks, tokenId}) => {
    const [
        tokenURI,
        dna, 
        owner, 
        AccessoriesType,
        clotheColor,
        clotheType,
        eyeType,
        eyeBrowType,
        facialHairColor,
        facialHairType,
        hairColor,
        hatColor,
        graphicType,
        mouthType,
        skinColor,
        topType,
    ] = await Promise.all([
        jesuspunks.methods.tokenURI(tokenId).call(),
        jesuspunks.methods.tokenDNA(tokenId).call(),
        jesuspunks.methods.ownerOf(tokenId).call(),
        jesuspunks.methods.getAccessoriesType(tokenId).call(),
        jesuspunks.methods.getClotheColor(tokenId).call(),
        jesuspunks.methods.getClotheType(tokenId).call(),
        jesuspunks.methods.getEyeType(tokenId).call(),
        jesuspunks.methods.getEyeBrowType(tokenId).call(),
        jesuspunks.methods.getFacialHairColor(tokenId).call(),
        jesuspunks.methods.getFacialHairType(tokenId).call(),
        jesuspunks.methods.getHairColor(tokenId).call(),
        jesuspunks.methods.getHatColor(tokenId).call(),
        jesuspunks.methods.getGraphicType(tokenId).call(),
        jesuspunks.methods.getMouthType(tokenId).call(),
        jesuspunks.methods.getSkinColor(tokenId).call(),
        jesuspunks.methods.getTopType(tokenId).call(),
    ]);
    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();

    return {
        tokenId,
        attributes:{
            AccessoriesType,
            clotheColor,
            clotheType,
            eyeType,
            eyeBrowType,
            facialHairColor,
            facialHairType,
            hairColor,
            hatColor,
            graphicType,
            mouthType,
            skinColor,
            topType,
        },
        tokenURI,
        dna,
        owner,
        ...metadata
    }
};
// plural

const useJesuspunksdata  = () => {
    const [punks, setPunks] = useState([]);
    const [loading,setLoading] = useState([true]);
    const jesuspunks = useJesuspunks();

    const update = useCallback(async () => {
        if(jesuspunks){
            setLoading(true);

            let tokenIds;

            const totalSupply = await jesuspunks.methods.totalSupply().call();
            tokenIds = new Array(totalSupply).fill().map((_, index) => index); 
            
            const punksPromise = tokenIds.map((tokenId) => 
            getPunkData({ tokenId, jesuspunks})
            );

            const punks = await Promise.all(punksPromise);

            setPunks(punks);
            setLoading(false);
        }
    }, [jesuspunks]); 


    useEffect (() => {
        update();
    }, [update]);

    return {
        loading,
        punks,
        update,
    };
};

// siguiente sera singular
// const useJesuspunksdata  = () => {

//}

export { useJesuspunksdata }