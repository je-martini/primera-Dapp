const getPunkData = async ({jesuspunks, tokenId}) => {
    const [
        tokenURI, dna, owner, AccessoriesType
    ] = await Promise.all([
        jesuspunks.methods.tokenURI(tokenId).call(),
        jesuspunks.methods.tokenDNA(tokenId).call(),
        jesuspunks.methods.ownerOf(tokenId).call(),
        jesuspunks.methods.getAccessoriesType(tokenId).call(),
        
    ]);
    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();

    return {
        tokenId,
        attributes:{
            AccessoriesType
        },
        tokenURI,
        dna,
        owner,
        ...metadata
    }
};
// plural

const usePlatziPunksData = () => {

};

// siguiente sera singular
// const usePlatziPunksData = () => {

//}