//PostForm.jsx
import { Form, Button } from 'react-bootstrap';
import { usePostFormStore } from '../../stores/postFormStore';
import { apiCreatePost } from '../../api/postApi';

export default function PostForm() {
    const { formData, setFormData, resetFormData } = usePostFormStore();

    const handleChange = (e) => {
        console.log('>>>', e.target.value);

        const { name, value } = e.target;
        setFormData({ [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await apiCreatePost(formData);
            alert(JSON.stringify(result));
            resetFormData();
        } catch (error) {
            console.error(error);
            alert('서버 요청 중 에러 발생: ' + error.message);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange} value={formData.name} required />
                </Form.Group>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={handleChange} value={formData.title} required />
                </Form.Group>
                <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" name="content" onChange={handleChange} value={formData.content} />
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>File</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" type="submit" className="my-2">
                    글쓰기
                </Button>
            </Form>
        </>
    );
}
