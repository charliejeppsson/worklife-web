import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapPin,
  faClock,
  faChair,
  faWifi,
  faCoffee,
  faMugHot,
  faCookieBite,
  faUtensils
} from '@fortawesome/free-solid-svg-icons'

export default function SpacesListItem(props) {
  const { space } = props

  return (
    <Link to={{
      pathname: "/spaces/" + space.id,
      state: { spaceId: space.id }
    }}>
      <li className="NewsListItem">
        <div className="NewsListItem__image">
          <img src={space.image.url} alt="Space"/>
          {space.image.info ? <span>{space.image.info}</span> : null}
        </div>
        <div className="NewsListItem__content">
          <div>
            <div className="NewsListItem__content__top-row">
              <p className="created-at">
                {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
              </p>
            </div>

            <h2>{space.name}</h2>
          </div>

          <div>
            <div className="NewsListItem__content__utilities">
              {space.coffee && <FontAwesomeIcon icon={faCoffee} />}
              {space.wifi && <FontAwesomeIcon icon={faWifi} />}
              {space.tea && <FontAwesomeIcon icon={faMugHot} />}
              {space.snacks && <FontAwesomeIcon icon={faCookieBite} />}
              {space.meals && <FontAwesomeIcon icon={faUtensils} />}
            </div>

            <div className="NewsListItem__content__details">
              <FontAwesomeIcon icon={faMapPin} />
              <p>{space.address}, {space.city}</p>
            </div>

            <div className="NewsListItem__content__details">
              <FontAwesomeIcon icon={faChair} />
              <p>Capacity: {space.capacity}</p> 
            </div>

            <div className="NewsListItem__content__details">
              <FontAwesomeIcon icon={faClock} />
              <p>{space.opensAt} - {space.closesAt}</p>
            </div>

            <div className="NewsListItem__content__booking-btn">
              <button className="worklife-btn">Reserve your seat</button> 
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
