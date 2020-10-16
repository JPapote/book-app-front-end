import React, { useState, useEffect, useRef } from 'react';



import { Card, Button, Form, Col } from 'react-bootstrap'

export default function AddBooks (props) {
    
    const [getState, setStateBooks] = useState({
        id:'',
        title: '',
        author: '',
        isbnNumber: '',
        price: '',
        language: '',
        coverPhotoURL: ''
    })
    const title = useRef()
    const author = useRef()
    const isbnNumber = useRef()
    const price = useRef()
    const language = useRef() 
    const coverPhotoURL = useRef()
    
    useEffect (() => {
         let id = props.match.params.id
        // console.log(window.URLSearchParams.toString())
        if(id){

            fetch(`http://localhost:8080/edit/${id}`, {
            method:'GET',
            headers: {
                Host: 'localhost:8080',
                // Accept: 'application/json',
                // 'Content-Type': 'application/json'
            }
        }).then(resp =>resp.json())
        .then(res => {
            title.current.value = res[0].title
            author.current.value = res[0].author
            isbnNumber.current.value = res[0].isbnnumber
            price.current.value = res[0].price
            language.current.value = res[0].language
            coverPhotoURL.current.value= res[0].coverphotourl
            console.log(res)
             setStateBooks(res)
        });   
    }        
    }, [])

   const submitBooks = async (event) => {
        event.preventDefault();
        const id = props.match.params.id
       
        
        const books = {
            
            title: title.current.value,
            author: author.current.value,
            isbnNumber: isbnNumber.current.value,
            price: price.current.value,
            language: language.current.value,
            coverPhotoURL: coverPhotoURL.current.value
        }
        if(id){
            console.log(books)
            await fetch(`http://localhost:8080/${id}`,{
                method: 'PUT',
                headers: {
                    Host: 'localhost:8080',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(books)
            }).then(resp => resp.json()).
            then(res => console.log(res))
            //    alert('Envio Exitoso') 
        }
        else{ 
     await fetch("http://localhost:8080",{
         method: 'POST',
         headers: {
             Host: 'localhost:8080',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(books)
     }).then(resp => {
        alert('Envio Exitoso')
        console.log(resp)

     }).catch(err => {
         console.log(err)
     }) 

         }
        
    }
    const bookList = () => {
         return window.history.push('/listBooks')
    }

        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header>Books Add</Card.Header>
                <Form onSubmit={submitBooks} id="bookFormId">
                <Card.Body>
                    <Form.Row>
                        <Form.Group controlId="titleId" as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" 
                            ref={title}
                            className="bg-dark text-white"
                             name='title'
                             required
                             value = {getState.title}
                              onChange={ e => setStateBooks({...getState, title: e.target.value})}
                             placeholder="Title" />
                        </Form.Group>

                        <Form.Group controlId="authorId" as={Col}>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" 
                            className="bg-dark text-white"
                             name='author' 
                             ref={author}
                             value={getState.author}
                            required
                            onChange={ e => setStateBooks({...getState, author: e.target.value})}
                             placeholder="Author" />
                        </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        <Form.Group controlId="isbnNumberId" as={Col}>
                            <Form.Label>ISBN Number</Form.Label>
                            <Form.Control type="number"
                            ref={isbnNumber} 
                            className="bg-dark text-white"
                            value={getState.isbnNumber}
                           name='isbnNumber'
                            required
                            onChange={ e => setStateBooks({...getState, isbnNumber: e.target.value})}
                           placeholder="ISBN Number" />
                        </Form.Group>

                        <Form.Group controlId="priceId" as={Col}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" 
                            ref={price}
                            className="bg-dark text-white"
                            name='price'  required value={getState.price}
                            onChange={ e => setStateBooks({...getState, price: e.target.value})}
                            placeholder="price" />
                        </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        <Form.Group controlId="languageId" as={Col}>
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" 
                            ref={language}
                            name="language"  required value={getState.language}
                            onChange={ e => setStateBooks({...getState, language: e.target.value})}
                            className="bg-dark text-white"
                             placeholder="language" />
                        </Form.Group>

                        <Form.Group controlId="coverPhotoURL" as={Col}>
                            <Form.Label>Cover Photo URL</Form.Label>
                            <Form.Control type="text" required ref={coverPhotoURL}
                            onChange={ e => setStateBooks({...getState, coverPhotoURL: e.target.value})}
                            className="bg-dark text-white" value={getState.coverPhotoURL}
                             placeholder="coverPhotoURL" name="coverPhotoURL"/>
                        </Form.Group>
                        </Form.Row>    
                </Card.Body>

                <Card.Footer style={{'textAlign':'right'}}>
                <Button size="sm" variant="info" type="button" onClick = {() => bookList}>
                            ListBooks
                         </Button>     
                <Button size="sm" variant="success" type="submit">
                            Submit
                         </Button>
                </Card.Footer>
                </Form>
            </Card>
        )

}