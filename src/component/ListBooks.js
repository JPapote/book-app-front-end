import React, {useState, useEffect} from 'react';

import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export default function ListBooks () {

    const[books, setBooks] = useState([])

    useEffect( ()=> {
            fetch('http://localhost:8080', {
            method:'GET',
            headers: {
                Host: 'localhost:8080',
                // Accept: 'application/json',
                // 'Content-Type': 'application/json'
            }
        }).then(resp => (resp.json())
            .then(res => setBooks(...books, books.concat(...res))))
            .catch(err => console.log(err))
        // .then(res => {
            // setBooks(...books, books.concat(...res))
        //    console.log()
        // });
    },[]);
    // console.log(books)
    const deleteBook = (id) => {
        fetch('http://localhost:8080/'+id, {
            method:'DELETE',
            headers: {
                Host:'localhost:8080'
            }
        }).then(resp => resp.json()).then(res => {
            if(res !== null){
            let deleteBook = books.filter(book => book.id !== id)
            alert('boock borrado'+ deleteBook);
            }
        })
     } 

     
        return (

            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faList}/>List Books</Card.Header>
                <Card.Body>
                    <Table bordered hover striped varient='dark'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th>Price</th>
                                <th>Language</th>
                                <th>Cover Photo URL</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? <tr align="center">
                              <td colSpan="7">No books Available</td>
                            </tr> : books.map(value => {
                                return (
                                    
                                    <tr key={value.id}>
                                    <td>{value.title}</td>
                                    <td>{value.author}</td>
                                    <td>{value.isbnnumber}</td>
                                    <td>{value.price}</td>
                                    <td>{value.language}</td>
                                    <td>{value.coverphotourl}</td>
                            
                                    <td>
                                        <ButtonGroup>
                              <Link to={"edit/"+ value.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>
                                            <Button size='sm' variant='outline-danger' onClick={() => deleteBook(value.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                        </ButtonGroup>
                                    </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )   
}



