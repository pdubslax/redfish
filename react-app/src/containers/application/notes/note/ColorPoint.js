import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
// queries
import { UPDATE_NOTES_COLOR } from "./../queries"

export const ColorOptionStyledDiv = styled.div`
  box-shadow: inset 0px 0px 0px 2px rgba(255,255,255,1);
  background-color: #${props => props.value};
  height: 32px;
  width: 32px
  border-radius: 16px;
`

function ColorPoint(props) {
  const handleColorUpdate = () => {
    console.log('CHANGE')
  }
  return (
    <Mutation 
      mutation={UPDATE_NOTES_COLOR} 
      update={handleColorUpdate} 
      variables={{ id: props.noteId, newColor: props.color.label }}
    >
      {(updateNotesColor, { data }) => (
        <ColorOptionStyledDiv value={props.color.value} onClick={async e => {
          e.preventDefault()
          await updateNotesColor()
        }}/>
      )}
    </Mutation>
  )
}

ColorPoint.propTypes = {
  noteId: PropTypes.string,
  color: PropTypes.object
}

export default ColorPoint