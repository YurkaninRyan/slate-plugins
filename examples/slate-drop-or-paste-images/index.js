
import DropOrPasteImages from 'slate-drop-or-paste-images'
import React from 'react'
import initialState from './state.json'
import { Editor } from 'slate-react'
import { State } from 'slate'

/**
 * Image node renderer.
 *
 * @type {Component}
 */

class Image extends React.Component {

  state = {}

  componentDidMount() {
    const { node } = this.props
    const { data } = node
    const file = data.get('file')
    this.load(file)
  }

  load(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }))
    reader.readAsDataURL(file)
  }

  render() {
    const { attributes } = this.props
    const { src } = this.state
    return src
      ? <img {...attributes} src={src} />
      : <span>Loading...</span>
  }

}

/**
 * Example.
 *
 * @type {Component}
 */

class Example extends React.Component {

  schema = {
    nodes: {
      image: Image
    }
  }

  plugins = [
    DropOrPasteImages({
      insertImage: (transform, file) => {
        return transform.insertBlock({
          type: 'image',
          isVoid: true,
          data: { file },
        })
      }
    })
  ]

  state = {
    state: State.fromJSON(initialState)
  }

  onChange = ({ state }) => {
    this.setState({ state })
  }

  render() {
    return (
      <Editor
        onChange={this.onChange}
        plugins={this.plugins}
        schema={this.schema}
        state={this.state.state}
      />
    )
  }

}

/**
 * Export.
 *
 * @type {Component}
 */

export default Example
