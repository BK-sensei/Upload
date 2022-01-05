import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ChakraProvider } from '@chakra-ui/react'

import { 
    Grid,
    GridItem,
    Center,
    InputGroup, 
    InputLeftElement, 
    Input,
    Button,
    Text,
    FormControl, 
    FormLabel, 
    FormErrorMessage, 
} from "@chakra-ui/react"

import { SunIcon, LockIcon } from '@chakra-ui/icons'

const Login = () => {
    const navigate = useNavigate()

    const formik = useFormik ({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: values => {
            fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json' // ça veut dire qu'on envoie du JSON et qu'on attend en retour du JSON
                },
                body: JSON.stringify(values)
            })
            .then(response => {
                if (response.status >= 400){
                    alert(response.statusText)
                }
                else{
                    navigate('/admin')
                }
            })
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
             .required("Username is required"),
            password: Yup.string()
             .required("Password is required")
        }),
        validateOnChange: false
    })

    return (
        <ChakraProvider>
            <Grid templateColumns='repeat(2, 1fr)' h='100vh'>
                <GridItem>
                    <Center h='100%' paddingLeft='50px' paddingRight='50px'>
                        <form onSubmit={formik.handleSubmit}>

                            <FormControl id="username" w="300px" isInvalid={formik.errors.username}>
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents='none'
                                    children={<SunIcon color='gray.300' />}
                                    />
                                    <Input
                                        type="text"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                    />
                                </InputGroup>
                                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="password" mt={5} w="300px" isInvalid={formik.errors.password}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents='none'
                                    children={<LockIcon color='gray.300' />}
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                </InputGroup>
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>

                            <Button mt={5} w='100%' type='submit' color='white' bg='salmon'>
                                Start
                            </Button>
                        </form>
                    </Center>
                </GridItem>

                <GridItem bg="gray.800">
                    <Center h='100%'>
                    <Text color="white" as="h1" fontWeight={800} fontSize={'54px'}>Login</Text>
                    </Center>
                </GridItem>
            </Grid>
        </ChakraProvider>
    )
}

export default Login