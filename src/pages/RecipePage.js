import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../actions/recipesActions';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const RecipePage = () => {

    const { data } = useSelector(state => state.recipe);
    const { user } = useSelector(state => state.authentication);
    const [inputs, setInputs] = useState({
        title: data?.data.title || '',
        description: data?.data.description || '',
        file: '',
        author: data?.data.author || { user: ''}
    });

    const { title, description, file, author } = inputs;
    const dispatch = useDispatch();
    const { id } = useParams('id');
    useEffect(() => {
        dispatch(recipesActions.getRecipe(user.token, id))
    },[]);

    useEffect(() => {
        setInputs({
            title: data?.data.title || '',
            description: data?.data.description || '',
            file: data?.data.file || '',
            author: data?.data.author
        })
    },[data])
    
    const deleteRecipe = (e) => {
        e.preventDefault();
        dispatch(recipesActions.deleteRecipe(user.token, id))
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Recipe</h2>
            <Form className="register-form">
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        disabled={true}
                        value={title}
                    />
                </Form.Group>
                <Form.Group controlId="author">
                    <img src={file} alt="file" />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        disabled={true}
                        value={description}
                    />
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        disabled={true}
                        value={author?.user}
                    />
                </Form.Group>
            </Form>
            <Link to="/recipes" className="btn btn-link">Back</Link>
            {author?.id === user.id ? 
            <>
            <Link to="/recipes" className="btn btn-link" onClick={deleteRecipe}>Delete</Link>
            <Link to={`/recipes/${id}/edit`} className="btn btn-link">Update</Link>
            </>
            : undefined }
    </div>
    );
}

export { RecipePage };