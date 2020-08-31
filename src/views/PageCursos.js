import React, { useState, useEffect } from 'react'

import {
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'

import Page from './Page'
import YouThumb from './YouThumb'
import YouEmbed from './YouEmbed'

import api from '../services/api'

function PageCursos() {

  const {id} = useParams()
  
  const [projeto, setProjeto] = useState([])
  const [categorias, setCategorias] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/projetos/${id}`)
      setProjeto(response.data)
      setCategorias(response.data.categorias)
    }
    fetchData()
  },[id])

  const {path} = useRouteMatch()

  return (
    <Page title={projeto.title}>
      <div className="page-view curso-view">
        <Switch>
          <Route exact path={path}>
            <div className="title-1">{projeto.title}</div>
            <p>&nbsp;</p>
            <p>Selecione uma categoria</p>
            {categorias.map((cat,i) => <Link className="curso-select" key={i} to={`/cursos/${id}/${cat.id}`}>{cat.title}</Link>)}
            <p>&nbsp;</p>
            <p>{projeto.description}</p>
          </Route>

          <Route path={`${path}/:catid`}>
            <Category id={id} projeto={projeto} />
          </Route>
        </Switch>
      </div>
    </Page>
  );
}

function Category(props) {

  const {path} = useRouteMatch()

  const {id, projeto} = props
  const {catid} = useParams()
  const [cat, setCat] = useState([])
  const [cursos, setCursos] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/categorias/${catid}`)
      setCat(response.data)
      setCursos(response.data.cursos)
    }
    fetchData()
  },[catid])

  return (
    <>
    <Switch>
      <Route exact path={path}>
        <div className="title-1">
          <span><Link to={`/cursos/${projeto.id}`}>{projeto.title}</Link> &raquo;&nbsp;</span>
          <span>{cat.title}</span>
        </div>
        <p>&nbsp;</p>
        <p>Selecione um curso</p>
        {cursos.map((curso,i) => {
          return (
            <Link key={i} className="curso-select" to={`/cursos/${id}/${cat.id}/${curso.id}`}>
              {curso.title}
            </Link>
          )
        })}
        <p>&nbsp;</p>
        <p>{projeto.description}</p>
      </Route>
      <Route path={`${path}/:cursoid`}>
        <Curso id={id} projeto={projeto} cat={cat} />
      </Route>
      </Switch>
      </>
  )
}

function Curso(props) {

  const {projeto,cat} = props
  
  const [curso, setCurso] = useState([])
  const [aulas, setAulas] = useState([])
  const [aula, setAula] = useState([])
  

  const {cursoid} = useParams()

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/cursos/${cursoid}`)
      setCurso(response.data)
      setAulas(response.data.aulas)
      setAula(response.data.aulas[0])
    }
    fetchData()
  },[cursoid])

  useEffect(()=>window.scrollTo(0, 0),[aula])

  return (
    <>
      <div className="title-1">
        <span><Link to={`/cursos/${projeto.id}`}>{projeto.title}</Link> &raquo;&nbsp;</span>
        <span><Link to={`/cursos/${projeto.id}/${cat.id}`}>{cat.title}</Link> &raquo;&nbsp;</span>
        <span>{curso.title}</span>
      </div>
      <div className="aulas-panel">
        <div className="aulas-view">
        <div className="aulas-view-video">
            <YouEmbed url={aula.video_url}/>
        </div>
          <AulaInfo aula={aula} professor_id={aula.professore}/>
        </div>
        <div className="aulas-select">
          {aulas.map((aula,i)=> <div className="aula" key={i} onClick={()=> setAula(aula)} >
        <div className="box">
        <YouThumb url={aula.video_url} />
        <p>{aula.title}</p>
      </div>
    </div>
    )}
        </div>
  </div>
    </>
  )
}

function AulaInfo(props) {
  const {aula, professor_id} = props
  const [professor, setProfessor] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/professores/${professor_id}`)
      setProfessor(response.data)
    }
    fetchData()
  },[professor_id])

  return (
    <div className="aulas-view-info">
      <h3 className="title-box">{aula.title}</h3>
      {aula.description &&
        <>
          <p>{aula.description}</p>
          <p>&nbsp;</p>
        </>
      }
      {professor &&
        <>
          <h3 className="title-box">{professor.name}</h3>
          {professor.bio}
        </>
      }
    </div>
  )
}

export default PageCursos;
