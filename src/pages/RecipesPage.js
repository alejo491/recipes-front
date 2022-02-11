import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../actions/recipesActions';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


const RecipesPage = () => {

    const { data } = useSelector(state => state.recipes );
    const { user } = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(recipesActions.getRecipes(user.token))
    },[]);

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Recipes</h2>
            <Link to={`/recipes/create`} className="btn btn-primary">Create</Link>
            <Table striped hover bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data?.data ? 
                    data.data.map((recipe) => 
                    <tr key={recipe.id}>
                        <td>{recipe.id}</td>
                        <td>{recipe.title}</td>
                        <td><Link to={`/recipes/${recipe.id}`} className="btn btn-link">Ver</Link></td>
                    </tr>
                    ) 
                    : 
                    (
                    <tr>
                        <td colSpan={3}>No data</td>
                    </tr>
                    )
                }
                
            </tbody>
            </Table>
        </div>
    );
}

export { RecipesPage };