import React from 'react';

import {Navbar, Container, Col} from 'react-bootstrap';

export default function Footer (){
        return(
            <Navbar fixed= 'bottom' bg='dark' variant='dark'>
                <Container>
                    <Col lg={12} className='text-center text-muted'>
                        <div>All Right Reserved by Javi</div>
                    </Col>
                </Container>
            </Navbar>
        )
    
}