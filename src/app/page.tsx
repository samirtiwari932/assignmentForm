import { ChakraProvider } from '@chakra-ui/react';
import FormComponent from './component/FormComponent';
import QueryClientComponent from './component/QueryClientComponent';


export default function Home() {
  return (
    <QueryClientComponent>
      <ChakraProvider>
        <FormComponent />
      </ChakraProvider>
    </QueryClientComponent>
  );
}

