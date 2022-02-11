import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../actions/recipesActions';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateRecipePage = () => {

    const { data } = useSelector(state => state.recipe);
    const [inputs, setInputs] = useState({
        title: data?.data.title || '',
        description: data?.data.description || '',
        image: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { title, description, image } = inputs;
    const { user } = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const { id } = useParams('id');
    useEffect(() => {
        dispatch(recipesActions.getRecipe(user.token, id))
    },[]);

    useEffect(() => {
        setInputs({
            title: data?.data.title || '',
            description: data?.data.description || '',
            image: ''
        })
    },[data])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        dispatch(recipesActions.updateRecipe(user.token, id, title, image, description))
    }

    function handleChange(e) {
        const { name, value } = e.target;        

        setInputs(inputs => ({ ...inputs, [name]: name === 'image' ? e.target.files[0] : value }));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Recipe</h2>
            <Form className="register-form" onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        isInvalid={submitted && !title}
                        onChange={handleChange}
                    />
                    {submitted && !title && 
                        <Form.Control.Feedback type='invalid'>
                            Title is required
                        </Form.Control.Feedback>
                    
                    }
                </Form.Group>
                <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />

                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={description}
                        isInvalid={submitted && !description}
                        onChange={handleChange}
                    />
                    {submitted && !description && 
                        <Form.Control.Feedback type='invalid'>
                            Description is required
                        </Form.Control.Feedback>
                    
                    }
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
            <Link to={`/recipes/${id}`} className="btn btn-link">Back</Link>
    </div>
    );
}

export { UpdateRecipePage };