import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HashLink as Link } from 'react-router-hash-link'

import api from '../services/api'

function VirtualAcademy(props) {

  const {academy, projects, id} = props

  const [dropIsDown,setDrop] = useState(false)
  const [selected,setSelected] = useState(0)
  const [slideTo, setSlideTo] = useState(null)

  const len = projects.length
  const current = projects[selected]
  const next = (selected + 1) % len
  const prev = (selected - 1 + len) % len

  // swiper events
  const onSlide = (e) => setSelected(e.realIndex)
  const bindSwiper = (swiper) => setSlideTo(() => x => swiper.slideToLoop(x))

  // dropdown events
  const dropToggle = () => setDrop(!dropIsDown)
  const dropSelect = (i) => () => {
    if(dropIsDown){
      setDrop(false)
    }
    setSelected(i)
    slideTo(i)
  }

  const hasnav = len > 1 ? 'block' : 'none';

  return (

    
    <section id={academy.slug} className={`home-curso full-section curso-Academia-virtual-Sinos`}>

      <div className="curso-swiper">
      <Swiper
          spaceBetween={50}
          loop={true}
          onSlideChange={onSlide}
          onSwiper={bindSwiper}
        >
          {projects.map((m,i)=>{
            return (
              <SwiperSlide key={`${m.id}-slide-${i}`}>
                <div className="curso-slide" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br${m.cover.url})`}}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="swiper-nav prev" style={{display: hasnav}} onClick={dropSelect(prev)}>&laquo; {projects[prev].title}</div>
        <div className="swiper-nav next" style={{display: hasnav}} onClick={dropSelect(next)}>{projects[next].title} &raquo;</div>
      </div>

      <div className="curso-info">

        <div className="col col-1">
          <div className="title" style={{backgroundColor: academy.color}}>{academy.title}</div>
          <div className="text">{academy.description}</div>
        </div>

        <div className="col col-2">
          <div className={`dropdown ${dropIsDown ? 'isdown' : ''}`}>
            <div className="selected" onClick={dropToggle}>
              <div className="droptitle">{dropIsDown ? 'Selecione' : current.title}</div>
              <div className="dropicon"><img src="/img/icons/arrow-down.svg" width="20" alt="" /></div>
            </div>
            <div className="options-viewport">
              <div className="options">
              {projects.map((m,i)=>{
                return <li key={`${academy.id}-drop-${i}`} style={{color: 'black'}} onClick={dropSelect(i)}>{m.title}</li>
              })}
              </div>
            </div>
          </div>
          {projects.map((project,i)=>{
            return(
              <div className="home-curso-cat" key={`home-curso-cat-${i}`}>
                <div className="desc">{project.title}</div>
                <div className="acessar">
                  <Link to={`/academyAgenda/${project.slug}/`}>Acessar &raquo;</Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
      
    </section>
  )
}

export default VirtualAcademy