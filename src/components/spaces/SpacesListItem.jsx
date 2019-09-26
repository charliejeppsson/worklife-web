import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

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
            <h2>{space.name}</h2>

            <p className="NewsListItem__content__description">
              {space.address}, {space.city}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}
