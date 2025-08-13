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
                    useEffect훅 (Count)
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook2">
                    useEffect훅 (Clock)
                </ListGroup.Item>
                <ListGroup.Item>useRef훅</ListGroup.Item>
                <ListGroup.Item>useNavigate훅</ListGroup.Item>
                <ListGroup.Item as={Link} to="/menu">
                    부모와 자식간의 데이터 전달
                </ListGroup.Item>

                <ListGroup.Item as={Link} to="/rest/1">
                    REST Api (User One)
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/rest2">
                    REST Api (User All)
                </ListGroup.Item>
            </ListGroup>
        </Stack>
    );
}
