import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Container, Row, Col} from 'react-bootstrap';

import NavegationBar from './component/NavegationBar';
import Welcome from './component/Welcome';
import Footer from './component/Footer';
import AddBooks from './component/AddBooks'
import ListBooks from './component/ListBooks';

function App() {

  const marginTop = {
    marginTop : '20px'
  }

  return (
 <Router>
      <NavegationBar/>
     <Container>
       <Row>
         <Col lg={12} style={marginTop}>
           <Switch>
              <Route path="/" exact component={Welcome}></Route>
              <Route path="/addBooks"  component={AddBooks}></Route>
              <Route path="/edit/:id"  component={AddBooks}></Route>
              <Route path="/listBooks" component={ListBooks}></Route>
            </Switch>
         </Col>
       </Row>
     </Container>
     <Footer></Footer>
     
     </Router>
  );
}

export default App;
