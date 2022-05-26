import { useWeb3React} from '@web3-react/core'
import { Grid,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    Button,
    FormHelperText,
    FormControl,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useJesuspunksdata } from '../../hooks/useJesusPunksData';
import { useState } from 'react';

const Punks = () => {
    const [address, setAddress] = useState('');
    const { active } = useWeb3React();

    const { punks, loading } = useJesuspunksdata();

    if (!active) return <RequestAccess />;
    
    return (
        <>
        <form>
            <FormControl>
                <InputGroup mb={3}>
                    <InputLeftElement pointerEvents='none' children={<SearchIcon color="gray.300" /> } 
                    />
                    <Input 
                    isInvalid={false}
                    value={address ?? ''}
                    onChange={() => {}}
                    placeholder="buscar por direccion"
                    />
                    <InputRightElement width="5.5rem">
                        <Button type="submit" h="1.75rem" size="sm">
                            buscar
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </form>
        {loading ? (
                <Loading /> 
            ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {punks.map(({ name, image, tokenId }) => (
            
            <Link key={tokenId} to={`/punks/${tokenId}`} >

              <PunkCard  image={image} name={name} />
            
            </Link>
            ))}
        </Grid>
            )}
        </> 
    );
};

export default Punks;