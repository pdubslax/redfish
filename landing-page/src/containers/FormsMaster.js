import React from 'react'
import axios from 'axios'

class FormsMaster extends React.Component {
  constructor(props) {
    super(props)
    this.postValues = this.postValues.bind(this)
    this.prepareValues = this.prepareValues.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(values, { setSubmitting, setErrors, setStatus }) {
    let preparedValues = this.prepareValues(values)
    this.postValues(preparedValues)
      .then(response => {
        this.handleResponse(response)
        setSubmitting(false)
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          setErrors(error.response.data)
          setStatus({ non_field_errors: error.response.data.non_field_errors })
        } else if (error.request) {
          setStatus({ non_field_errors: 'Something wrong with a server' })
          console.log('Something wrong with a server')
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        setSubmitting(false)
      })
  }
  prepareValues(values) {
    return values
  }
  postValues(values) {
    return axios({
      method: 'post',
      url: 'http://localhost:9000/' + this.endpoint,
      data: values,
    })
  }
}

export default FormsMaster
