import { Heading, Card, CardBody, CardHeader } from '@chakra-ui/react'

export const ModifiableCard= ({ w, h, bg, header, body } ) => {
  return (
    <Card bg={bg} w={w} h={h}>
        <CardHeader>
            <Heading size='md'>{ header }</Heading>
        </CardHeader>

        <CardBody>
            { body }
        </CardBody>
    </Card>

  )
}
