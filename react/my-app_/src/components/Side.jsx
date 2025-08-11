// Side.jsx
import { Stack, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Side() {
    return (
        <Stack gap={2} className="col-md-8 mx-auto">
            <Button variant="primary" as={Link} to="/">
                Home
            </Button>
            <hr></hr>
            <ListGroup>
                <ListGroup.Item as={Link} to="/hook1">
                    useEffect훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/comp2">
                    useEffect훅
                </ListGroup.Item>
                <ListGroup.Item>useEffect훅</ListGroup.Item>
                <ListGroup.Item>useEffect훅</ListGroup.Item>
            </ListGroup>
        </Stack>
    );
}
