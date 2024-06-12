import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { Switch, Box, Flex } from '@chakra-ui/react'

function Main() {
    const [btn, setBtn] = useState(false)

    const handleSwitch = () => {
        setBtn(!btn)
    }

    return (
        <Flex
            direction="column"
            minHeight="100vh"
            backgroundColor={btn ? 'black' : 'white'}
            color={btn ? 'white' : 'black'}
        >
            <Box p={4}>
                <Switch isChecked={btn} onChange={handleSwitch} colorScheme='teal' size='lg' />
            </Box>
            <Box flex="1">
                <RouterProvider router={router} />
            </Box>
        </Flex>
    )
}

export default Main;
