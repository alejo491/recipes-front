import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../actions/recipesActions';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateRecipePage = () => {

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { title, description, image } = inputs;
    const { user } = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        dispatch(recipesActions.createRecipe(user.token, title, image, description))
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
                        isInvalid={submitted && !image}
                        onChange={handleChange}
                    />
                    {submitted && !image && 
                        <Form.Control.Feedback type='invalid'>
                            Image is required
                        </Form.Control.Feedback>
                    
                    }
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
                    Create
                </Button>
            </Form>
            <Link to="/recipes" className="btn btn-link">Back</Link>
    </div>
    );
}

export { CreateRecipePage };