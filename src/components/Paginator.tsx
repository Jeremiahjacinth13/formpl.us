import './styles/paginator.css'
import Arrow from '../assets/icons/arrow'
import { useDispatch, useSelector } from 'react-redux'
import { templatesSelector } from '../store/slices/templateSlice'
import {
  paginatorSelector,
  incrementPageIndex,
  decrementPageIndex,
} from '../store/slices/paginatorSlice'
import { NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE } from '../constants'

export const Paginator: React.FC = () => {
  const dispatch = useDispatch()
  const { templates } = useSelector(templatesSelector)
  const { currentPageIndex } = useSelector(paginatorSelector)
  const pageLimit = Math.ceil(
    templates.length / NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE,
  )

  return (
    <div className="paginator__container">
      <button
        onClick={() => dispatch(decrementPageIndex())}
        className="buttonreset paginator__control paginator__control--left"
      >
        <Arrow direction="left" />
        Previous
      </button>
      <p className="paginator__value">
        <span className="paginator__currentPage">{currentPageIndex}</span>
        {' of '}
        <span className="paginator__totalPages">{pageLimit}</span>
      </p>
      <button
        onClick={() => dispatch(incrementPageIndex(pageLimit))}
        className="buttonreset paginator__control paginator__control--right"
      >
        <span>Next</span>
        <Arrow direction="right" />
      </button>
    </div>
  )
}
