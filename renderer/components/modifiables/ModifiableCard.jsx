import { Heading, Card, CardBody, CardHeader } from '@chakra-ui/react'

export const ModifiableCard= ({ w, h, bg, header, body, p="1rem" } ) => {
  return (
    <Card bg={bg} w={w} h={h} p={ p }>
        <CardHeader>
            <Heading size='md'>{ header }</Heading>
        </CardHeader>

        <CardBody>
            { body }
        </CardBody>
    </Card>

  )
}
