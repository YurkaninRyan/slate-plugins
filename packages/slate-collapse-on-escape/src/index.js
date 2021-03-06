
import toPascal from 'to-pascal-case'

/**
 * A Slate plugin to add soft breaks on return.
 *
 * @param {Object} options
 *   @property {String} toEdge
 * @return {Object}
 */

function CollapseOnEscape(options = {}) {
  return {
    onKeyDown(event, change) {
      const { state } = change
      if (event.key != 'Escape') return
      if (state.isCollapsed) return
      const edge = toPascal(options.toEdge || 'start')
      return change[`collapseTo${edge}`]()
    }
  }
}

/**
 * Export.
 */

export default CollapseOnEscape
