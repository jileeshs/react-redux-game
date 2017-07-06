import { browserHistory } from 'react-router'
export function goToPage (path) {
  browserHistory.push(path)
}
