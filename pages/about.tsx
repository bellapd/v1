import { Heading, Stack, Text, Box} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { Color } from '../utils/color'

const About: NextPage = () => {
    return (
        <Layout>
            <Stack align="Center">
                <Heading size='3xl' fontSize='10rem' >
                    <Box
                    as='span'
                    bgGradient='linear-gradient(90deg,#feac5e, #c779d0, #4bc0c8)'
                    bgClip='text'
                    // _hover={{
                    //     outlineColor: '#ffff',
                    //     boxShadow: 'outline',
                    //     borderColor: 'gray.300',
                    // }}
                    >
                    About
                    </Box>
                </Heading>
            </Stack>

            <Stack align="right" direction="row" my={7}>
                <Text>
                 My name is Annabella Putri Dirgo, I'm a student at the National Tsing Hua University, Hsinchu, Taiwan. I'm currently working on projects related to web development using tools like React, Next-js, Golang, and Docker.
                 I'm also creating a content for my blog where I discuss projects that I'm working on and create tutorials to educate others.
                </Text>
            </Stack>           
        </Layout>
    )
}

export default About