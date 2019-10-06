import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import moment from 'moment'
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import PropTypes from 'prop-types'

import { CREATE_EVENT, EVENTS } from '../../../../graphql/constants'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './EventForm.scss'

export default function EventForm(props) {
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState(new Date())
  const [selectedStartTime, setSelectedStartTime] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(new Date())
  const [selectedEndTime, setSelectedEndTime] = useState(null)
  const [selectedSpace, setSelectedSpace] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT)
  const alert = useAlert()

  const formattedDatetime = (date, time) => (
    `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm')}`
  )

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    const params = {
      title: selectedTitle,
      description: selectedDescription,
      startTime: formattedDatetime(selectedStartDate, selectedStartTime),
      endTime: formattedDatetime(selectedEndDate, selectedEndTime),
      imageUrl: selectedImage,
      spaceId: selectedSpace
    }

    await createEvent({
      variables: params,
      update: (store, { data: { createEvent } }) => {
        try { // Update events list in Apollo cache/store
          const data = store.readQuery({ query: EVENTS })
          data.events.push(createEvent)
          store.writeQuery({ query: EVENTS, data })
        } catch(err) {
          console.warn(err)
        }
      }
    })

    props.closeModal()
  }

  if (loading) { return <li className="SpacesListItem"><LoadingSpinner /></li> }
  if (error) { return alert.show('The booking could not be created.') }

  return (
    <div ref={props.wrapperRef} className="EventForm__modal">
      <h2>Create event</h2> 

      <form className="EventForm__form">
        <label>Title</label>
        <input
          id="event-title"
          type="text"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        />
        
        <label>Description</label>
        <input
          id="event-description"
          type="text"
          value={selectedDescription}
          onChange={(e) => setSelectedDescription(e.target.value)}
        />

        <label>Start time</label>
        <div className="EventForm__form__datetime">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={selectedStartDate}
              onChange={setSelectedStartDate}
              variant="inline"
              disableToolbar
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              value={selectedStartTime}
              onChange={setSelectedStartTime}
              variant="inline"
              ampm={false}
            />
          </MuiPickersUtilsProvider>
        </div>

        <label>End time</label>
        <div className="EventForm__form__datetime">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={selectedEndDate}
              onChange={setSelectedEndDate}
              variant="inline"
              disableToolbar
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              value={selectedEndTime}
              onChange={setSelectedEndTime}
              variant="inline"
              ampm={false}
            />
          </MuiPickersUtilsProvider>
        </div>
        
        <label>Location</label>
        <select
          id="event-space"
          value={selectedSpace}
          onChange={(e) => setSelectedSpace(e.target.value)}
        >
          <option value="">-- Please choose an option --</option>
          <option value="3">Octopus</option>
          <option value="2">Artsy</option>
          <option value="1">Indigo</option>
        </select>

        <label>Image URL</label>
        <input
          id="event-image"
          type="text"
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
        />

        <button className="worklife-btn" onClick={handleCreateEvent}>
          Create 
        </button>
      </form>
    </div>
  )
}

EventForm.propTypes = {
  closeModal: PropTypes.func,
  wrapperRef: PropTypes.object
}
