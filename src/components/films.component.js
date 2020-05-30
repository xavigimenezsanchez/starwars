import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Card, Spinner } from "react-bootstrap";

import FilmsService from "../services/films.service";

export default class Films extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      films: [],
      characters: [],
      filmSelectedId: null,
      filmsLoading: false,
      charactersLoading: false,
      error: ""
    };

    this.loadFilms = this.loadFilms.bind(this);
    this.loadCharacters = this.loadCharacters.bind(this);
    this.updateCharacters = this.updateCharacters.bind(this);
    this.getCharactersCards = this.getCharactersCards.bind(this);
  }

  componentDidMount() {
    this.setState({filmsLoading: true}, this.loadFilms)
    
  }
  loadFilms() {
    FilmsService.getFilms().then(
      response => {
        this.setState({
          films: response.data.data,
          filmsLoading: false
        });
      },
      error => {
        this.setState({
          error:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
          filmsLoading: false
        });
      }
    );
  }
  loadCharacters(filmId) {
    FilmsService.getCharacters(filmId).then(
      response => {
        this.setState({
          characters: response.data.data,
          charactersLoading: false
        });
      },
      error => {
        this.setState({
          error:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
          charactersLoading: true
        });
      }
    );
  }
  updateCharacters(filmId) {
    this.setState({
      filmSelectedId: filmId,
      characters: [],
      charactersLoading: true
    }, ()=>this.loadCharacters(filmId))
    
  }
  getCharactersCards() {
    let id = 1;
    const characters =  this.state.characters.map(c=> (
      <Col key={id++} sm={12} md={4} xs={3}>
        <Card >
          <Card.Body>
            <Card.Title>{c.nombre}</Card.Title>
            <Card.Text>
              <strong>Especie: </strong>{c.especie}
              <br/>
              <strong>Origen: </strong>{c.origen}
              <br/>
              <strong>Sexo: </strong>{c.sexo}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
          ))
      return (
        <Row>
          {characters}
        </Row>
      )
  }
  render() {
    return (
      <Container>
        <header className="jumbotron">
          
          <h3 hidden={!this.state.filmsLoading}><Spinner  animation="border" role="status" variant="warning"/> Cargando Pelis ...</h3>
          
          <div hidden={this.state.filmsLoading}> 
            <h1>StarWars Films <span hidden={!this.state.error}>{this.state.error}</span></h1>
          </div>
          
        </header>
        <Row>
          <Col sm={12} md={4} xs={3} >
            <ListGroup>
              {this.state.films.map(f=> (<ListGroup.Item key= {f.id} active={f.id===this.state.filmSelectedId}onClick={()=>this.updateCharacters(f.id)} >
                                                <Spinner hidden={!(this.state.charactersLoading && f.id===this.state.filmSelectedId)} animation="grow" size="sm" variant="dark"/>{f.titulo}
                                        </ListGroup.Item>))}
            </ListGroup>
          </Col>
          <Col sm={12} md={8} >
                {this.getCharactersCards()}
          </Col>
        </Row>
      </Container>
    );
  }
}