import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import PropTypes from 'prop-types'

import { CREATE_COLLAB, COLLABS } from '../../../../graphql/constants'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './CollabForm.scss'

export default function CollabForm(props) {
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [selectedCompensation, setSelectedCompensation] = useState(0)
  const [selectedImage, setSelectedImage] = useState('')
  const [createCollab, { loading, error }] = useMutation(CREATE_COLLAB)
  const alert = useAlert()

  const handleCreateCollab = async (e) => {
    e.preventDefault()
    const params = {
      title: selectedTitle,
      description: selectedDescription,
      duration: parseInt(selectedDuration),
      compensation: parseInt(selectedCompensation),
      imageUrl: selectedImage,
    }

    await createCollab({
      variables: params,
      update: (store, { data: { createCollab } }) => {
        try { // Update collabs list in Apollo cache/store
          const data = store.readQuery({ query: COLLABS })
          data.collabs.push(createCollab)
          store.writeQuery({ query: COLLABS, data })
        } catch(err) {
          console.warn(err)
        }
      }
    })

    props.closeModal()
  }

  if (loading) { return <li className="CollabsListItem"><LoadingSpinner /></li> }
  if (error) { return alert.show('The collab could not be created.') }

  return (
    <div ref={props.wrapperRef} className="CollabForm__modal">
      <h2>Create collab</h2> 

      <form className="CollabForm__form">
        <label>Title</label>
        <input
          id="collab-title"
          type="text"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        />
        
        <label>Description</label>
        <input
          id="collab-description"
          type="text"
          value={selectedDescription}
          onChange={(e) => setSelectedDescription(e.target.value)}
        />

        <label>Duration</label>
        <select
          id="event-duration"
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
        >
          <option value={30}>1 month</option>
          <option value={90}>3 month</option>
          <option value={180}>6 months</option>
          <option value={360}>12 months or more</option>
        </select>

        <label>Compensation (USD/month)</label>
        <input
          id="collab-compensation"
          type="number"
          value={selectedCompensation}
          onChange={(e) => setSelectedCompensation(e.target.value)}
        />

        <label>Image URL</label>
        <input
          id="collab-image"
          type="text"
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
        />

        <button className="worklife-btn" onClick={handleCreateCollab}>
          Create 
        </button>
      </form>
    </div>
  )
}

CollabForm.propTypes = {
  closeModal: PropTypes.func,
  wrapperRef: PropTypes.object
}
